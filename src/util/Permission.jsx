import React from 'react';
import {
  PermissionsAndroid,
  Platform,
} from 'react-native';

const { OS } = Platform

export const requestLocationPermission = async () => {
  try {
    switch (OS) {
      case "android":
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          // {
          //   title: 'Cool Photo App ACCESS_FINE_LOCATION Permission',
          //   message:
          //     'Cool Photo App needs access to your ACCESS_FINE_LOCATION ' +
          //     'so you can take awesome pictures.',
          //   buttonNeutral: 'Ask Me Later',
          //   buttonNegative: 'Cancel',
          //   buttonPositive: 'OK',
          // },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the ACCESS_FINE_LOCATION');
          return true;
        } else {
          console.log('ACCESS_FINE_LOCATION permission denied');
          return false;
        }

      case "ios":
        return Geolocation.requestAuthorization("whenInUse")
      default:
        break;
    }

  } catch (err) {
    console.warn(err);
  }
};

export const requestBluetoothPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
      if (res === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      else {
        return false
      }
    } else {
      return true
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestWriteExternalStoragePermission = async () => {
  try {
    switch (OS) {
      case "android":
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to save images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Write External Storage permission granted');
          return true
        } else {
          console.log('Write External Storage permission denied');
          return false
        }

      case "ios":
        return true
      default:
        break;
    }

  } catch (err) {
    console.warn(err);
  }

};
