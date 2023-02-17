import React from "react";
import { Image, View, Text } from "react-native";
import { ICONS } from "../../assets/icons";
import styles from "./styles";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import DrawerButton from "./DrawerButton";
import Navigation from "../../navigation/root";
import metrix from "../../config/metrix";
import { useDispatch, useSelector } from "react-redux";
import { SCREENS } from "../../config";
import { clearUserData } from "../../store/actions";

const DrawerContent = (props: any) => {
  const dispatch = useDispatch();
  const { isAuth, customer, user } = useSelector((state: any) => state.auth);
  const { userInfoLocal } = useSelector((state: any) => state.common);
  // const {
  //   company: { company_logo_url },
  // } = userInfoLocal;
  // console.log({ company_logo_url });
  const loggedInrouteOrders = [
    {
      name: "home",
      routeName: SCREENS.HOME,
      icon: ICONS.tab1,
    },
    {
      name: "Register Farmer",
      routeName: SCREENS.REGISTER,
      icon: ICONS.tab2,
    },
    {
      name: "Update Farmer",
      routeName: SCREENS.HOME,
      icon: ICONS.tab3,
    },
    {
      name: "Add Buying Record",
      routeName: SCREENS.HOME,
      icon: ICONS.tab4,
    },
    {
      name: "Saved Tranactions",
      routeName: SCREENS.HOME,
      icon: ICONS.tab5,
    },
    {
      name: "Saved Plots",
      routeName: SCREENS.HOME,
      icon: ICONS.tab6,
    },
    {
      name: isAuth ? "Logout" : "Sign In",
      routeName: SCREENS.LOGIN,
      icon: ICONS.logoutIcon,
    },
  ];

  const handleOnDrawerItemPress = (item: any) => {
    console.log("draweritemitem", item);
    if (item.name == "Logout" && isAuth) {
      dispatch(clearUserData());
      Navigation.toggleDrawer();
    } else {
      Navigation.closeDrawer();
      if (item.name == "Sign In") {
        console.log("navigate to sign in ");
        Navigation.navigate(item.routeName);
      } else {
        console.log("in last else");
        Navigation.navigate(item.routeName);
      }
    }
  };

  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <View style={{ ...styles.container }}>
        <View style={styles.colContainer}>
          {/* {isAuth && (
            <Image
              source={{ uri: company_logo_url }}
              style={styles.avatarimg}
            />
          )} */}
          <Text style={styles.nameText}>
            {isAuth ? user.full_name : "My Account"}
          </Text>
        </View>
        <View style={styles.routeContainer}>
          {loggedInrouteOrders?.map((item, index) => (
            <DrawerButton
              key={index.toString()}
              onPress={handleOnDrawerItemPress}
              item={item}
            />
          ))}
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: metrix.VerticalSize(15),
          }}
        >
          {/* <Text style={styles.nameText}>{"Change Language"}</Text> */}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
