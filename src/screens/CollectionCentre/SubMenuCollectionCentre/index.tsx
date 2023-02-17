import React, { Fragment } from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { styles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../../store/actions";
// import { showToast } from "../../utils";
import { Images } from "../../../assets/images";
import { SCREENS } from "../../../config";
import { ICONS } from "../../../assets/icons";
import Navigation from "../../../navigation/root";

import Screen from "./screen";
import { Header } from "../../../components";

function Index(props: any) {
  // const dispatch = useDispatch();

  // const registerOptions: any = [
  //   {
  //     name: "Farmer Registration",
  //     icon: ICONS.register1,
  //     route: SCREENS.FARMER_REGISTRTION,
  //   },
  //   {
  //     name: "New Collection Center",
  //     icon: ICONS.register2,
  //     // route: SCREENS.REGISTER,
  //   },
  //   {
  //     name: "Pending Registrations",
  //     icon: ICONS.register3,
  //     // route: SCREENS.REGISTER,
  //   },
  //   {
  //     name: "Update Farmers",
  //     icon: ICONS.register4,
  //     // route: SCREENS.REGISTER,
  //   },
  //   {
  //     name: "Sync Registered Farmers",
  //     icon: ICONS.register5,
  //     // route: SCREENS.REGISTER,
  //   },
  // ];

  const onCardPress = (item: any) => {
    item.route ? Navigation.navigate(item.route) : null;
  };

  return (
    <Fragment>
      <Header
        // containerStyle={{ padding: "8" }}
        backButton={true}
        back={false}
        text={"Collection Center"}
      />
      <Screen {...props} />
    </Fragment>
  );
}

export default Index;
