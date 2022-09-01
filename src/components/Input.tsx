import React from "react";
import { StyleSheet, TextInput, StyleProp, View, Text } from "react-native";
import { Metrix, Colors, Fonts } from "../config";

interface IInputProps {
  containerStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  children: string;
  placeholder: string;
  loading?: boolean;
  onPress: () => {};
}

function Index({
  textStyle = {},
  containerStyle = {},
  children,
  loading = false,
  onPress,
  placeholder = "",
}: IInputProps) {
  const styles = StyleSheet.create({
    container: {
      textAlign: "center",
      backgroundColor: loading ? Colors.LigthGrey : Colors.Primary,
      borderRadius: Metrix.Radius,
      alignItems: "center",
      justifyContent: "center",
      height: Metrix.VerticalSize(50),
    },
    textStyle: {
      color: "white",
      textAlign: "center",
      fontSize: Metrix.FontRegular,
    },
    input: {
      borderColor: Colors.Theme_Blue,
      borderWidth: Metrix.VerticalSize(1),
      borderRadius: Metrix.Radius,
      paddingVertical: Metrix.VerticalSize(12),
      paddingHorizontal: Metrix.HorizontalSize(15),
      marginBottom: Metrix.VerticalSize(25),
    },
  });
  return (
    <View style={[containerStyle, styles.container]}>
      <TextInput
        onChangeText={(text: string) => {}}
        style={styles.input}
        value={""}
        placeholder={placeholder}
        maxLength={32}
      />
    </View>
  );
}

export default Index;
