import React, { useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";

const touchableProps = {
  activeOpacity: 0.5,
};

const DrawerButton = ({ item, onPress }) => {
  const [help, openHelp] = useState(false);
  const [categories, opencategories] = useState(false);
  const [about, showAbout] = useState(false);
  const [account, showAccount] = useState(false);

  return (
    <TouchableOpacity
      {...touchableProps}
      onPress={() => onPress(item)}
      style={[styles.container]}
    >
      <View style={styles.drawerItemheight}>
        <View style={styles.rowContainer}>
          <Image
            source={item?.icon}
            resizeMode="contain"
            style={[styles.iconImg]}
          />
          <Text style={styles.drawerText}>{item?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerButton;
