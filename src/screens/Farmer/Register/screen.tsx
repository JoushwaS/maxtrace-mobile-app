import React from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { styles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../../store/actions";
// import { showToast } from "../../utils";
import { Images } from "../../../assets/images";
import { SCREENS } from "../../../config";
import { ICONS } from "../../../assets/icons";
import Navigation from "../../../navigation/root";

interface IFarmerRegister {}

function Index(props: IFarmerRegister) {
  // const dispatch = useDispatch();

  const registerOptions: any = [
    {
      name: "Farmer Registration",
      icon: ICONS.register1,
      route: SCREENS.FARMER_REGISTRTION,
    },
    {
      name: "Collection Center",
      icon: ICONS.register2,
      route: SCREENS.COLLECTION_CENTRE,
    },
    {
      name: "Pending Registrations",
      icon: ICONS.register3,
      route: SCREENS.FARMER_PENDING_REGISTRTIONS,
    },
    {
      name: "Update Farmers",
      icon: ICONS.register4,
      route: SCREENS.UPDATE_FARMERS,
    },
    {
      name: "Sync Registered Farmers",
      icon: ICONS.register5,
      // route: SCREENS.REGISTER,
    },
  ];

  const onCardPress = (item: any) => {
    item.route ? Navigation.navigate(item.route) : null;
  };

  return (
    <View style={styles.container}>
      {/* <Text numberOfLines={1} style={styles.heading}>
        Register
      </Text> */}
      {registerOptions.map((item: any, index: number) => (
        <TouchableOpacity
          key={index.toString()}
          onPress={() => onCardPress(item)}
          activeOpacity={0.5}
          style={styles.card}
        >
          <Image source={item.icon} style={styles.icon} resizeMode="contain" />
          <Text style={styles.cardHeading}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Index;
