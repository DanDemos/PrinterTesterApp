import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, StatusBar, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FrameText } from '../../customizedNative/FrameText';
import CustomContainer from 'screens/layout/CustomContainer';
import { THEME_COLOR } from 'util/color';

import React, { memo, useEffect, useState } from 'react';
import { PrintersList, Button, ScreenTitle } from '../../components';
import ThermalPrinterModule from 'react-native-thermal-printer';
import {NativeModules} from 'react-native';

const AllInOneYTPage = props => {
  console.log(NativeModules.MyBrotherModule.printImage, "MyBrotherModule")
  return (
    <CustomContainer children={ChildComponent()}
      scrollview={false}
      HeaderOption={{
        center:
          <View>
            <Text style={{ fontSize: 18, color: THEME_COLOR.dark_brown, fontWeight: "bold" }}>
              AllInOneYT
            </Text>
          </View>,
        right:
          <View>
            <Text style={{ color: THEME_COLOR.dark_brown }}>
              Right
            </Text>
          </View>
      }}
    >

    </CustomContainer>
  );
};

const ChildComponent = (props) => {
  const isFocused = useIsFocused();

  const [ip, setip] = useState("192.168.110.113:8081");
  const [error, setError] = useState(null);
  const [state, setState] = useState(null);
  async function printTCP() {
    if (ip) {
      ThermalPrinterModule.defaultConfig = {
        ...ThermalPrinterModule.defaultConfig,
        ip: ip,
        port: 9100,
        autoCut: false,
        timeout: 30000,
      };
      try {
        console.log("start all in one");
        setError("start all in one");
        await ThermalPrinterModule.printTcp({ payload: 'hello world' });
        console.log("end all in one");
        setError("end all in one");
      } catch (err) {
        //error handling
        console.log(err.message);
        setError(err.message);
      }
    }
    else {
      setError("Please enter IP address of your printer")
    }
  }

  async function printBluetooth() {
    // inside async function
    try {
      setState("start all in one");
      await ThermalPrinterModule.printBluetooth({
        payload: 'hello world',
        printerNbrCharactersPerLine: 38,
      });
      setState("end all in one");
    } catch (err) {
      //error handling
      console.log(err.message);
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isFocused) {
      setip("192.168.110.113:8081")
      setError(null)
    }
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      setError(null)
    }, 4000);
  }, [error]);

  return (
    <View style={styles.container}>

      <View style={styles.contentCotainer}>
        <ScreenTitle title="AllInOneYT/react-native-printer" />
        <Text style={{ color: THEME_COLOR?.whitish, padding: 10 }}>{ip ? ip : "Enter IP"}</Text>
        <TextInput
          style={styles.input}
          // style={{ backgroundColor: ip ? "#65dca4" : "#db4d75", ...styles.input }}
          onChangeText={setip}
          value={ip}
        />
        <Button
          style={{ marginBottom: 10 }}
          disable={ip ? false : true}
          title="TCP Print"
          onPress={() => printTCP()}
        />

        <Button
          style={{ marginBottom: 10 }}
          disable={ip ? false : true}
          title="Bluetooth Print"
          onPress={() => printBluetooth()}
        />
        {state ? (
          <Text style={styles.stateText}>{state}</Text>
        ) : null}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: THEME_COLOR.whitish,
    fontSize: 30,
    fontWeight: 'bold',
    // color: 'yellow'
  },
  button: {
    backgroundColor: THEME_COLOR.primary,
    padding: 10,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentCotainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: THEME_COLOR.whitish,
    marginBottom: 20,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
  stateText: {
    color: 'green',
    fontSize: 16,
    marginTop: 20,
  },
})

export default AllInOneYTPage;