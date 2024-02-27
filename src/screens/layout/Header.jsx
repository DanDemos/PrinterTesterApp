// import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import callApi from '../../services/api/apiClient';
import { useNavigation } from '@react-navigation/native';
import { FrameText } from '../../customizedNative/FrameText';
import { SafeAreaView } from 'react-native';
import { IconComp } from 'components/icon/icon';
import { THEME_COLOR } from 'util/color';

const Header = props => {
  const navigation = useNavigation()
  return (
    <View style={{ backgroundColor: "#fd9e4a", width: "100%", height: 60, paddingLeft: 10, paddingRight: 10 }}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

        {
          props?.HeaderOption?.left != undefined
            ?
            props?.HeaderOption?.left
            :
            <TouchableOpacity
            onPress={_=> navigation?.openDrawer()}
            >
              <IconComp icon name="menu" type="entypo" size={28} color={THEME_COLOR.dark_brown} />
            </TouchableOpacity>
        }
        {
          props?.HeaderOption?.center != undefined ? props?.HeaderOption?.center : <View></View>
        }
        {
          props?.HeaderOption?.right != undefined ? props?.HeaderOption?.right : <View></View>
        }
      </View>
    </View>
  );
};

const LeftSide = props => {
  const navigation = useNavigation()

  return (
    <View>
    </View>
  )
}

const Center = props => {
  return (
    <View>
      <Text>
        Center
      </Text>
    </View>
  )
}

const RightSide = props => {
  return (
    <View>
      <Text>
        Hello World
      </Text>
    </View>
  )
}

export default Header;