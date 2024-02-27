/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useCallback, useState, useReducer } from "react";
import { useColorScheme, View, Text, Button } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persist, store } from './src/redux/store/configureStore';
import NavigationProvider from './src/routers/router'
import { IconComp } from "./src/components/icon/icon";
import { useNetInfo } from "@react-native-community/netinfo";

function App() {
  const netInfo = useNetInfo()

  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
      {
          netInfo?.isConnected
            ?
            <NavigationProvider />
            :
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ff0000" }}>
              <View style={{ borderRadius: 50, backgroundColor: "#fff", padding: 20 }}>
                <IconComp icon name="wifi-off" type="feather" size={50} color={"#ff0000"} />
              </View>
              <Text style={{marginTop: 20, marginBottom: 0, fontSize: 20, color: "#fff" }}>No Internet Connection!</Text>
              <Text style={{color: "#fff", marginBottom: 0}}>Please check your connection!</Text>
              {/* <Text size="xl" color="light">Please try again!</Text> */}
            </View>
        }
        {/* <AlertProvider />
        <ModalProvider /> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
