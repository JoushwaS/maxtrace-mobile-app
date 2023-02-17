import React from "react";
import { useColorScheme, SafeAreaView } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useSelector } from "react-redux";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Colors } from "../config/theme";
import Navigator from "./root";
import {
  ResetPassword,
  Login,
  Home,
  SelectLanguage,
  EnterPin,
  NewPassword,
} from "../screens";
import { SCREENS } from "../config";
import metrix from "../config/metrix"; // import DrawerNavigator from "./DrawerNavigator";
import DrawerContent from "./DrawerNavigator/DrawerContent";

import HomeTabNavigator from "./TabNavigator";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNavigator = (props: any) => {
  return (
    <Drawer.Navigator
      drawerContent={(screenProps: any) => {
        return <DrawerContent {...screenProps} />;
      }}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          backgroundColor: Colors.Primary,
          width: metrix.HorizontalSize(345),
        },
        sceneContainerStyle: {
          // backgroundColor: "#000000",
        },
      }}
    >
      <Drawer.Screen name="TabNavigator" component={HomeTabNavigator} />
    </Drawer.Navigator>
  );
};
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={"HOME"}
    >
      <Stack.Screen name={SCREENS.HOME} component={HomeTabNavigator} />
      {/* <Stack.Screen name={SCREENS.MAIN_DRAWER} component={DrawerNavigator} /> */}
    </Stack.Navigator>
  );
}

function AuthStack(language: string) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      // initialRouteName={!language ? SCREENS.SELECT_LANG : SCREENS.LOGIN}
    >
      {language ? (
        <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      ) : (
        <Stack.Screen name={SCREENS.SELECT_LANG} component={SelectLanguage} />
      )}

      <Stack.Screen name={SCREENS.RESET_PASSWORD} component={ResetPassword} />
      <Stack.Screen name={SCREENS.ENTER_PIN} component={EnterPin} />
      <Stack.Screen name={SCREENS.NEW_PASSWORD} component={NewPassword} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const scheme = useColorScheme();
  const { isAuth } = useSelector((state: any) => state.auth);
  const { language } = useSelector((state: any) => state.common);

  return (
    <NavigationContainer
      ref={(ref) => Navigator.setTopLevelNavigator(ref)}
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {/* <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.Primary,
        }}
      > */}
      <Drawer.Navigator
        drawerContent={(screenProps: any) => {
          return <DrawerContent {...screenProps} />;
        }}
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          drawerStyle: {
            backgroundColor: Colors.Primary,
            width: metrix.HorizontalSize(345),
          },
          sceneContainerStyle: {
            // backgroundColor: "#000000",
          },
        }}
      >
        <Drawer.Screen name="TabNavigator" component={HomeTabNavigator} />
      </Drawer.Navigator>
      {/* {isAuth ? MainStack() : AuthStack(language)} */}
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

export default Navigation;
