import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "../components/customDrawer/customDrawer";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import TreverPage from "screens/trever/TreverPage";
import ContactPage from "screens/contact/ContactPage";
import LoginPage from "screens/auth/LoginPage";
import { SimplePrint } from "screens/trever/SimplePrint";
import AllInOneYTPage from "screens/AllInOneYT/AllInOneYTPage"
import BrotherSDKPage from "screens/brothersdk/BrotherSDKPage";
import XprinterPage from "screens/xprinter/XprinterPage";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

const NavigationProvider = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;
          routeNameRef.current = currentRouteName;
        }}>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DrawerNavigation'}
      screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
    </Stack.Navigator>
  )
}

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        // drawerType: 'front',
        // // drawerLabelStyle: { marginLeft: -25 }, 
        // drawerActiveBackgroundColor: "red",
        // drawerActiveTintColor: "white",
        // drawerInactiveTintColor: "blue"
      }}>
      <Drawer.Screen name="AppStack" component={AppStack} />
      {/* <Drawer.Screen name="BottomTab" component={BottomTabNavigator} /> */}
    </Drawer.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ animation: 'none', headerShown: false }}>
      {/* screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}> */}
      <Stack.Screen name="TreverPage" component={TreverPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="ContactPage" component={ContactPage} />
      <Stack.Screen name="SimplePrint" component={SimplePrint} />
      <Stack.Screen name="AllInOneYTPage" component={AllInOneYTPage} />
      <Stack.Screen name="BrotherSDKPage" component={BrotherSDKPage} />
      <Stack.Screen name="XprinterPage" component={XprinterPage} />
    </Stack.Navigator>
  )
}

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name="TopTab" component={TopTabNavigator} />
    </BottomTab.Navigator>
  );
}

const TopTabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <TopTab.Navigator style={{
      paddingTop: insets.top
    }} tabBarPosition="top" screenOptions={{ headerShown: false }}>
      {/* <TopTab.Screen name="TopTabNavigator" component={} /> */}
    </TopTab.Navigator>
  );
}


export default NavigationProvider;
