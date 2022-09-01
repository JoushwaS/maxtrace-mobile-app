import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Images } from "../assets";
import { Metrix, Colors } from "../config";

interface IButtonProps {}

function Index({}: IButtonProps) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      marginVertical: Metrix.VerticalSize(15),
    },
    image: {
      width: Metrix.VerticalSize(70),
      height: Metrix.VerticalSize(70),
    },

    text: {
      fontSize: Metrix.FontSmall,
      color: Colors.Primary,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Powered By MaxTrace</Text>
      <Image source={Images.Logo} resizeMode="contain" style={styles.image} />
    </View>
  );
}

export default Index;
