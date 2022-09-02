import React from "react";
import { useColorScheme, SafeAreaView } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useSelector } from "react-redux";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Colors } from "../config/theme";
import Navigator from "./root";
import { ResetPassword, Login, Home, SelectLanguage } from "../screens";
import { SCREENS } from "../config";
const Stack = createStackNavigator();
// const BottomTabs = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={SCREENS.HOME}
    >
      <Stack.Screen name={SCREENS.HOME} component={Home} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={SCREENS.SELECT_LANG}
    >
      <Stack.Screen name={SCREENS.SELECT_LANG} component={SelectLanguage} />
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.RESET_PASSWORD} component={ResetPassword} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const scheme = useColorScheme();
  const { isAuth } = useSelector((state: any) => state.auth);
  return (
    <NavigationContainer
      ref={(ref) => Navigator.setTopLevelNavigator(ref)}
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.White,
        }}
      >
        {isAuth ? MainStack() : AuthStack()}
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default Navigation;
