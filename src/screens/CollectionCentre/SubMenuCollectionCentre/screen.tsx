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

function Index(props: any) {
  // const dispatch = useDispatch();

  const registerOptions: any = [
    {
      name: "Collection Center",
      icon: ICONS.register1,
      route: SCREENS.ADD_COLLECTION_CENTRE,
    },
    {
      name: "Pending Collection Centers",
      icon: ICONS.register3,
      route: SCREENS.LIST_COLLECTION_CENTRE,
    },
    {
      name: "Sync Collection Center",
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
