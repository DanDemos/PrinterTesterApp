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
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(PermissionsAndroid.RESULTS.GRANTED);
      console.log('You can use');
      return true
    } else {
      console.log('permission denied');
      return false
    }
  } catch (err) {
    console.warn(err);
  }
};
