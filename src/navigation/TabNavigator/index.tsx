import React, { useState, useEffect } from "react";

import { TouchableOpacity, View, Image, Keyboard } from "react-native";
import { ICONS } from "../../assets/icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "./styles";
import HomeNavigator from "../HomeStack";
import navigation from "../root";
import { SCREENS } from "../../config";
import { useDispatch, useSelector } from "react-redux";

import { Home, Login, NewPassword, ResetPassword } from "../../screens";
import { Colors } from "../../config/theme";

const Tab = createBottomTabNavigator();

const tabRoutes = [
  {
    id: "T1",
    name: SCREENS.HOME,
    image: ICONS.tab1,
  },
  {
    id: "T2",
    name: SCREENS.LOGIN,
    image: ICONS.tab2,
  },

  {
    id: "T3",
    name: SCREENS.RESET_PASSWORD,
    image: ICONS.tab3,
  },
];

function HomeTabNavigator(props: any) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const dispatch = useDispatch();
  const { isAuth, customer, user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <Tab.Navigator
      tabBarVisible={true}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(tabProps) => {
        if (isAuth && !isKeyboardVisible) {
          return <MyTabBar {...tabProps} {...props} />;
        }
      }}
    >
      <Tab.Screen name={SCREENS.HOME_STACK} component={HomeNavigator} />
      <Tab.Screen name={SCREENS.LOGIN} component={Login} />
      {/* <Tab.Screen name={SCREENS.RESET_PASSWORD} component={ResetPassword} /> */}
    </Tab.Navigator>
  );
}

const onTabPress = (route: any, index: number) => {
  console.log("onTabPress");
  // navigation.navigate(route.name);
};

const MyTabBar = ({ state }) => {
  return (
    <View style={styles.container}>
      {tabRoutes.map((route: any, index: number) => {
        const isFocused = state?.index === index;
        return (
          <TouchableOpacity
            // onPress={onTabPress}
            activeOpacity={0.5}
            key={index.toString()}
            style={styles.viewCon}
          >
            <Image
              style={{
                ...styles.icon,
                tintColor: !isFocused ? Colors.Grey : Colors.Primary,
              }}
              source={route.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HomeTabNavigator;
