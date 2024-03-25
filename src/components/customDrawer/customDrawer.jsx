import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import { IconComp } from "../icon/icon";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';

export const CustomDrawer = props => {
  const navigation = useNavigation()
  return (
    <>
      <DrawerContentScrollView style={{ backgroundColor: "lightgreen" }} {...props}>
        <Text style={{ textAlign: "center", backgroundColor: "#ccc" }}>Welcome Dan</Text>
        <ScrollView style={{ flexGrow: 1, backgroundColor: "pink", paddingTop: 10 }}>
          {/* <DrawerItem
            label="tr3v3r"
            icon={({ focused, color, size }) => <IconComp name={focused ? 'home' : 'home'} type="awesome" size={size} color={color} />}
            onPress={() => navigation.navigate('TreverPage')}
          /> */}
          <DrawerItem
            label="Login"
            icon={({ focused, color, size }) => <IconComp name={focused ? 'login-variant' : 'login-variant'} type="mcommunity" size={size} color={color} />}
            onPress={() => navigation.navigate('LoginPage')}
          />
        </ScrollView>
      </DrawerContentScrollView>

      <SafeAreaView style={{ backgroundColor: "yellow" }}>

        <View style={{ padding: 10, borderTopWidth: 1, borderColor: "#ccc", backgroundColor: "skyblue" }}>
          <Text style={{ textAlign: "center" }}>Version: 1.0.1</Text>
        </View>

      </SafeAreaView>
    </>

  )
}

export default CustomDrawer;