import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  StyleProp,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Images } from "../assets";
import { Metrix, Colors } from "../config";

interface IInputProps {
  containerStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  label: string;
  isPassword?: boolean;
}

function Index({
  onChangeText,
  placeholder = "",
  value,
  label,
  isPassword,
}: IInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const styles = StyleSheet.create({
    container: {
      borderRadius: Metrix.Radius,
      height: Metrix.VerticalSize(55),
      borderColor: Colors.LigthGrey,
      borderWidth: Metrix.VerticalSize(2),
      marginBottom: Metrix.VerticalSize(30),
    },
    textStyle: {
      position: "absolute",
      fontSize: Metrix.FontRegular,
      top: Metrix.VerticalSize(-10),
      left: Metrix.HorizontalSize(12),
      backgroundColor: Colors.White,
      color: Colors.HeadingText,
      paddingHorizontal: Metrix.HorizontalSize(5),
    },
    input: {
      paddingVertical: Metrix.VerticalSize(12),
      paddingHorizontal: Metrix.HorizontalSize(15),
      marginBottom: Metrix.VerticalSize(25),
      height: Metrix.VerticalSize(50),
    },
    icon: {
      height: Metrix.VerticalSize(20),
      width: Metrix.VerticalSize(20),
    },
    btnContainer: {
      position: "absolute",
      right: Metrix.HorizontalSize(15),
      top: Metrix.VerticalSize(15),
    },
  });

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={[styles.container]}>
      <TextInput
        onChangeText={onChangeText}
        style={styles.input}
        value={value}
        placeholder={placeholder}
        maxLength={32}
        secureTextEntry={isPassword ? showPassword : false}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleToggle}
          activeOpacity={0.5}
        >
          <Image
            style={styles.icon}
            source={Images.eyeBtn}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.textStyle}>{label}</Text>
    </View>
  );
}

export default Index;
