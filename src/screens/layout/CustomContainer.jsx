import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, StatusBar } from 'react-native';
import { FrameText } from '../../customizedNative/FrameText';
// import { SafeAreaView } from 'react-native';
import Header from 'screens/layout/Header';
import BottomTab from './BottomTab';
import { ScrollView } from 'react-native';
import { THEME_COLOR } from 'util/color';

const { height } = Dimensions.get('screen');

const CustomContainer = props => {
  return (
    props?.disabled
      ?
      props?.children
      :
      <CustomContainerShell {...props}>
        {props?.children}
      </CustomContainerShell>
  )
}

const CustomContainerShell = (props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {/* <SafeAreaView style={{ backgroundColor: "green", flex: 1, paddingBottom: Math.max(insets.bottom, 16) }}> */}
      <View style={styles.container}>
        {
          (props?.header == false || props?.header == "disable") ? null : <Header HeaderOption={props?.HeaderOption} />
        }
        {
          (props?.scrollview == false || props?.scrollview == "disable")
            ?
            props?.children
            :
            <ScrollView contentContainerStyle={styles.body}>
              {props?.children}
            </ScrollView>
        }
        {
          (props?.bottomtab == false || props?.bottomtab == "p") ? null : <BottomTab />
        }
      </View>
      {/* </SafeAreaView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: THEME_COLOR.secondary,
    flex: 1,
    // margin: 0,
    // padding: 0,
    // display: "flex",
    // flexDirection: "column",
    // minHeight: height - 60,
  },
  body: {
    flex: 1,
    width: "100%",
    backgroundColor: THEME_COLOR.secondary,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },

});

export default CustomContainer