import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Register,
  FarmerRegistration,
  AddPlot,
  SubMenuCollectionCentre,
  NewCollectionCentre,
  CollectionCentreList,
  PendingRegistration,
  UpdateFarmers,
} from "../../screens";
import { Colors, Metrix, SCREENS } from "../../config";
import metrix from "../../config/metrix";
import { Button, ToastAndroid, View } from "react-native";

const HomeStack = createStackNavigator();

const headerCommonProps = {
  headerBackTitleVisible: false,
  headerLeftContainerStyle: {
    paddingLeft: Metrix.HorizontalSize(15),
  },
  headerRightContainerStyle: {
    paddingRight: Metrix.HorizontalSize(15),
  },
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: Colors.HEADER_BG,
      //   },
      //   headerTintColor: Colors.Black,
      //   headerTitleStyle: {
      //     fontSize: metrix.FontLarge,
      //   },
      // }}
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen
        name={SCREENS.HOME}
        options={{ title: "Home" }}
        component={Home}
      />
      <HomeStack.Screen
        name={SCREENS.REGISTER}
        options={{
          title: "Register",
          ...headerCommonProps,
        }}
        component={Register}
      />
      <HomeStack.Screen
        name={SCREENS.FARMER_REGISTRTION}
        options={{
          title: "Farmer Registration",
          ...headerCommonProps,
        }}
        component={FarmerRegistration}
      />
      <HomeStack.Screen
        name={SCREENS.ADD_PLOT}
        options={{
          title: "Add Plot",
          ...headerCommonProps,
        }}
        component={AddPlot}
      />
      <HomeStack.Screen
        name={SCREENS.COLLECTION_CENTRE}
        options={{
          title: "Collection Center",
          ...headerCommonProps,
        }}
        component={SubMenuCollectionCentre}
      />
      <HomeStack.Screen
        name={SCREENS.ADD_COLLECTION_CENTRE}
        options={{
          title: "New Collection Centre",
          ...headerCommonProps,
        }}
        component={NewCollectionCentre}
      />
      <HomeStack.Screen
        name={SCREENS.LIST_COLLECTION_CENTRE}
        options={{
          title: "List Collection Centre",
          ...headerCommonProps,
        }}
        component={CollectionCentreList}
      />
      <HomeStack.Screen
        name={SCREENS.FARMER_PENDING_REGISTRTIONS}
        options={{
          title: "Pending Registrations",
          ...headerCommonProps,
        }}
        component={PendingRegistration}
      />
      <HomeStack.Screen
        name={SCREENS.UPDATE_FARMERS}
        options={{
          title: "Update Farmers",
          ...headerCommonProps,
        }}
        component={UpdateFarmers}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
