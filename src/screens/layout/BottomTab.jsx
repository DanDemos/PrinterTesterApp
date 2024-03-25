// import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import callApi from '../../services/api/apiClient';
import { useNavigation } from '@react-navigation/native';
import { FrameText } from '../../customizedNative/FrameText';
import { SafeAreaView } from 'react-native';
import { IconComp } from 'components/icon/icon';
import { THEME_COLOR } from 'util/color';
import { useRoute } from '@react-navigation/native';


const BottomTab = props => {
  const navigation = useNavigation()
  const route = useRoute();
  return (
    <View style={{ backgroundColor: THEME_COLOR.primary, width: "100%", height: 80, paddingLeft: 10, paddingRight: 10 }}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>

        {/* <BottomTabBtn onPress={(_ => navigation?.navigate("TreverPage"))}>
          <IconComp icon name="triangle" type="ionic" size={30} color={route.name == "TreverPage" ? THEME_COLOR.whitish : THEME_COLOR.dark_brown} />
          <Text style={{ fontSize: 12, color: route.name == "TreverPage" ? THEME_COLOR.whitish : THEME_COLOR.dark_brown }}>
            tr3v3r
          </Text>
        </BottomTabBtn> */}
        <BottomTabBtn onPress={(_ => navigation?.navigate("AllInOneYTPage"))}>
          <IconComp icon name="square-sharp" type="ionic" size={30} color={route.name == "AllInOneYTPage" ? THEME_COLOR.whitish : THEME_COLOR.dark_brown} />
          <Text style={{ fontSize: 12, color: THEME_COLOR.dark_brown }}>
          AllInOneYT
          </Text>
        </BottomTabBtn>
        <BottomTabBtn onPress={(_ => navigation?.navigate("BrotherSDKPage"))}>
          <IconComp icon name="pentagon" type="mcommunity" size={30} color={route.name == "BrotherSDKPage" ? THEME_COLOR.whitish : THEME_COLOR.dark_brown} />
          <Text style={{ fontSize: 12, color: THEME_COLOR.dark_brown }}>
          BrotherSDK
          </Text>
        </BottomTabBtn>
        <BottomTabBtn onPress={(_ => navigation?.navigate("XprinterPage"))}>
          <IconComp icon name="hexagon" type="mcommunity" size={30} color={route.name == "XprinterPage" ? THEME_COLOR.whitish : THEME_COLOR.dark_brown} />
          <Text style={{ fontSize: 12, color: THEME_COLOR.dark_brown }}>
          Xprinter
          </Text>
        </BottomTabBtn>
      </View>
    </View>
  );
};

const BottomTabBtn = props => {
  return (
    <TouchableOpacity onPress={props?.onPress}>
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {props.children}
      </View>
    </TouchableOpacity>
  )
}

export default BottomTab;