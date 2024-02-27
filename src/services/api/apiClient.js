import { createApiThunk } from '../../redux/reducers/reducer';
import { dispatchStore } from '../../redux/util/dispatchStore';
import { selectStore } from '../../redux/util/selectStore';
import { endpoints } from './endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GenerateID } from '../../redux/util/GenerateID';
import { token_endpoint } from '../../helper/setAccessToken';
import { loadingSlice } from '../../redux/reducers/reducer';
import callAxios from './axios';
import { token_key } from '../../helper/setAccessToken';
import { AccessTokenSlice, ExpireAlertBox } from '../../redux/reducers/reducer';
import { FindAccessToken } from '../../helper/setAccessToken';

const callApi = apiName => {
  let uniqueAPI_id = null;
  const [apiGroup, endpointKey] = apiName.split('/');

  const endpoint = endpoints?.[apiGroup]?.[endpointKey];
  if (endpoint == undefined) {
    throw new Error(
      'Cannot find endpoint. Please Check endpoints.js and endpoint passed in callApi function',
    );
  }

  const thunkName = `${apiGroup}/${endpointKey}`;

  const [token_endpointGroup, token_endpointKey] = token_endpoint.split('/');

  let segment = null;
  let headers = null;
  let body = null;
  let params = null;
  let keyparameter = null;
  let group_name = null;
  let missing_AccessToken = false;

  const apiCall = {
    withSegment: segmentData => {
      segment = segmentData;
      return apiCall;
    },
    withParam: paramData => {
      params = paramData;
      return apiCall;
    },
    withKeyParameter: keyparameterData => {
      for (const key in keyparameterData) {
        if (
          typeof keyparameterData[key] == 'number' ||
          typeof keyparameterData[key] == 'string' ||
          Array.isArray(keyparameterData[key]) == false
        ) {
          if (keyparameter == null) {
            keyparameter = {};
          }
          keyparameter[key] = keyparameterData[key];
        }
      }
      return apiCall;
    },
    withHeaders: headersData => {
      headers = headersData;
      return apiCall;
    },
    withBody: bodyData => {
      body = bodyData;
      return apiCall;
    },
    loadingGroup: groupName => {
      group_name = groupName;
      return apiCall;
    },
    addAccessToken: () => {
      if (
        (endpoint?.token === 'require' || endpoint?.token === 'optional') &&
        selectStore('AccessToken')?.length > 0
      ) {
        headers = headers
          ? {
            ...headers,
            [token_key]: selectStore('AccessToken'),
          }
          : { [token_key]: selectStore('AccessToken') };
      } else if (endpoint?.token === 'require') {
        missing_AccessToken = true;
      }
      return apiCall;
    },
    execute: async () => {
      if (missing_AccessToken) return;
      const payload = {
        endpoint,
        segment,
        params,
        keyparameter,
        headers,
        body,
      };

      uniqueAPI_id = GenerateID();
      const loadingData = { uniqueAPI_id, group_name };

      dispatchStore(loadingSlice.actions.setLoading(loadingData));

      try {
        let res = await callAxios(payload);
        if (apiName == token_endpoint) {
          dispatchStore(
            AccessTokenSlice.actions.setAccessToken(FindAccessToken(res)),
          );
        }

        if (res?.status == "fail") {
          if (res?.error == "access token is expired or invalid") {
            dispatchStore(AccessTokenSlice.actions.removeAccessToken());
            dispatchStore(ExpireAlertBox.actions.setExpireAlertBox(true));
          }
        }
        if (endpoint?.res_modifier) {
          res = endpoint.res_modifier(res);
        }
        if (Number(endpoint?.expire_in > 0)) {
          const currentDate = new Date();
          const expireDate = new Date();
          expireDate.setDate(currentDate.getDate() + Number(endpoint?.expire_in));
          res.expireDate = expireDate;
        }
        dispatchStore(loadingSlice.actions.setLoading(loadingData));
        return res;
      } catch (e) {
        return e;
      }
    },
    executeDispatch: () => {
      if (missing_AccessToken) return;

      const payload = {
        endpoint,
        segment,
        params,
        keyparameter,
        headers,
        body,
      };
      uniqueAPI_id = GenerateID();
      let response
      const loadingData = { uniqueAPI_id, group_name };

      const getLocalStorage = async (apiGroup, endpointKey) => {
        const localstorage = await AsyncStorage.getItem('persist:root');
        endpointKey = endpointKey;
        if (localstorage) {
          const parsedLocalStorage = JSON.parse(localstorage);
          const check_data = parsedLocalStorage[apiGroup];
          let endpointData;
          if (check_data) {
            endpointData = JSON.parse(check_data)?.[endpointKey];
          }

          if (endpointData && endpointData.expireDate) {
            const currentDate = new Date();
            const expireDate = new Date(endpointData.expireDate);
            if (currentDate > expireDate) {
              const asyncThunk = createApiThunk(thunkName, payload);
              response = await dispatchStore(asyncThunk());
            } else {
              console.log(
                currentDate > expireDate,
                'persist is not expired yet',
              );
            }
          } else {
            const asyncThunk = createApiThunk(thunkName, payload, loadingData);
            response = await dispatchStore(asyncThunk());
          }
        } else {
          const asyncThunk = createApiThunk(thunkName, payload, loadingData);
          response = await dispatchStore(asyncThunk());
        }
        return uniqueAPI_id;
      };

      getLocalStorage(apiGroup, endpointKey);
      return response?.payload;
    },
  };

  return apiCall.addAccessToken();
};

export default callApi;
