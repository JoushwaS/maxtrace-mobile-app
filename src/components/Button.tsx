import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  Text,
} from "react-native";
import { Metrix, Colors, Fonts } from "../config";

interface IButtonProps {
  buttonStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  loaderStyle?: StyleProp<any>;
  children: string;
  loading?: boolean;
  bgWhite?: boolean;
  disabled?: boolean;
  textBlack?: boolean;
  borderBlack?: boolean;
  onPress: () => void;
}

function Index({
  textStyle = {},
  buttonStyle = {},
  loaderStyle = {},
  children,
  loading = false,
  onPress,
  disabled = false,
  bgWhite = false,
  borderBlack = false,
  textBlack = false,
}: IButtonProps) {
  const styles = StyleSheet.create({
    button: {
      textAlign: "center",
      backgroundColor: disabled
        ? Colors.LigthGrey
        : bgWhite
        ? Colors.White
        : Colors.Primary,
      borderRadius: Metrix.Radius,
      borderWidth: borderBlack ? 0.5 : 0,
      borderColor: borderBlack ? Colors.Black : "",

      alignItems: "center",
      justifyContent: "center",
      height: Metrix.VerticalSize(50),
    },
    textStyle: {
      color: textBlack ? Colors.Black : "white",
      textAlign: "center",
      fontSize: Metrix.FontRegular,
    },
  });
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      activeOpacity={0.5}
      onPress={onPress}
      style={[buttonStyle, styles.button]}
    >
      {loading ? (
        <ActivityIndicator
          color={Colors.White}
          animating
          size="small"
          style={loaderStyle}
        />
      ) : (
        <Text style={[textStyle, styles.textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

export default Index;
