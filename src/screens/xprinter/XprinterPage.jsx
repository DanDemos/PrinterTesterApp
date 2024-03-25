import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Dimensions, StatusBar, TextInput, ImageBackground } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FrameText } from '../../customizedNative/FrameText';
import CustomContainer from 'screens/layout/CustomContainer';
import { THEME_COLOR } from 'util/color';

import React, { useMemo, memo, useEffect, useState, useRef } from 'react';
import { PrintersList, Button, ScreenTitle } from '../../components';

import QRCode from 'react-native-qrcode-svg';
import SvgUri from 'react-native-svg-uri';
import RNFS from 'react-native-fs';
import { requestLocationPermission, requestWriteExternalStoragePermission } from 'util/Permission';
import ViewShot from 'react-native-view-shot';
import { requestBluetoothPermission } from 'util/Permission';
import { NativeModules } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const XprinterPage = props => {
  return (
    <CustomContainer children={ChildComponent()}
      scrollview={false}
      HeaderOption={{
        center:
          <View>
            <Text style={{ fontSize: 18, color: THEME_COLOR.dark_brown, fontWeight: "bold" }}>
              Xprinter
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

  const [error, setError] = useState(null);
  const [state, setState] = useState(null);
  const [imageURI, setImageURI] = useState(null);
  const [latestFilename, setLatestFilename] = useState(null);
  const viewShotRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      deleteImageIfExists();
      setError(null)
    }
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      setError(null)
    }, 4000);
  }, [error]);

  useEffect(() => {
    console.log(imageURI, "imageURI")
  }, [imageURI]);

  const deleteImageIfExists = async () => {
    try {
      const path = RNFS.DocumentDirectoryPath + '/helloworld.png';
      const fileExists = await RNFS.exists(path);
      if (fileExists) {
        await RNFS.unlink(path);
        console.log('Existing image deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting existing image: ', error);
    }
  };

  const handleSaveImage = async () => {
    try {
      // Generate a unique filename (e.g., using timestamp)
      const timestamp = Date.now();
      const path = RNFS.DocumentDirectoryPath + `/${timestamp}.png`;

      // Save the captured image to the new filename
      const uri = await viewShotRef.current.capture();
      await RNFS.copyFile(uri, path);

      // Set the latest filename and image URI
      setLatestFilename(path);
      setImageURI('file://' + path);
    } catch (error) {
      console.error('Error saving image: ', error);
    }
  };

  async function printImageBluetooth(imageURI) {
    let bluetoothPermission = await requestBluetoothPermission();
    console.log(bluetoothPermission, "bluetooth")
    if (bluetoothPermission) {
      let b = await NativeModules.MyBrotherModule.printImageBluetooth(imageURI)
      setError(b)
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.contentCotainer}>
        <ScreenTitle title="XprinterPage" />
        <Button
          style={{ marginBottom: 10 }}
          title="Save Image"
          onPress={() => handleSaveImage()}
        />

        <Button
          style={{ marginBottom: 10 }}
          title="Print with Bluetooth"
          onPress={() => printImageBluetooth(imageURI)}
        />

        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
          <View style={{ width: 200, height: 100 }}>
            <View style={{ flex: 1, flexDirection: "row", backgroundColor: "white", justifyContent: "space-evenly", alignItems: 'center' }}>
              <QRCode value="Your QR code data here" size={60} />
              <View>
                <Text>CGS-Steel</Text>
                <Text>0000000884471</Text>
                <Text>No of items : 2</Text>
                <Text>3D2F</Text>
              </View>
            </View>
          </View>
        </ViewShot>

        <View style={{ flex: 1 }}>
          <Image
            source={imageURI ? { uri: imageURI } : require('./../../../files/testPNG.png')}
            style={{ width: screenWidth, aspectRatio: 1, resizeMode: 'contain' }} />
          {/* <Image
            source={require('./../../../files/testPNG.png')}
            style={{ width: screenWidth, aspectRatio: 1, resizeMode: 'contain' }} /> */}
        </View>

        {state ? (
          <Text style={styles.stateText}>{state}</Text>
        ) : null}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imgcolumn: {
    flex: 1,
    alignItems: 'center',
  },
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

export default XprinterPage;