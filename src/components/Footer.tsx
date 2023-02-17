import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Images } from "../assets/images";
import { Metrix, Colors } from "../config";

interface IButtonProps {}

function Index({}: IButtonProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingVertical: Metrix.VerticalSize(25),
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
      <View>
        <Text style={styles.text}>Powered By MaxTrace</Text>
      </View>
      <View>
        <Image source={Images.Logo} resizeMode="contain" style={styles.image} />
      </View>
    </View>
  );
}

export default Index;
