import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "../../config/theme";
import metrix from "../../config/metrix";
import HomeTabNavigator from "../TabNavigator";
import DrawerContent from "./DrawerContent";
import { Home } from "../../screens";

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

export default DrawerNavigator;
