import { res_modifiers_config } from "../../helper/res_modifiers_config";

// Define the API URLs for different environments
export const API_URLs = {
  production: "http://admin-uat.chainpromm.com",
  development: "http://admin-uat.chainprshop.com",
};

export const endpoints = Object.freeze({
  auth: {
    login: {
      method: "get",
      endpoint: "api/auth/token",
      // res_modifier: res_modifiers_config.getAccessToken,
      // token: "optional", // require, optional
      // expire_in: 10
    },
  },
  others: {
    otherIn: {
      method: "get",
      endpoint: "api/auth/{:userid}/token",
    },
    faceBookSignIn: {
      method: "get",
      endpoint: "api/auth/facebook",
    },
  },
  persistSlice: {},
  myNonApiReduxSlice: {},
});
