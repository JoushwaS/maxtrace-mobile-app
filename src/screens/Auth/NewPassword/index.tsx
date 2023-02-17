import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Button, Footer, Input } from "../../../components";
// import { useDispatch } from "react-redux";
import Navigation from "../../../navigation/root";
import { Images } from "../../../assets/images";
import { SCREENS } from "../../../config";
import { setNewPassword } from "../../../config/api/auth";
import { showToast } from "../../../utils";

interface INewPasswordProps {
  route: any;
}

function Index({ route = {} }: INewPasswordProps) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      if (password === confirmPassword) {
        setLoading(true);
        const { data: passData } = await setNewPassword({
          password,
          token: route?.params?.pin,
        });
        setLoading(false);
        console.log("passData", passData);
        if (passData.status) {
          showToast({
            type: "success",
            text: passData.message || "Password reset successfully",
          });
          Navigation.navigate(SCREENS.LOGIN);
        }
      } else {
        showToast({
          type: "error",
          text: "Passwords do not match",
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        text: error?.response?.data?.message || error.message,
      });
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source={Images.Logo} />
      <Text style={styles.heading}>Create New Password</Text>
      <Input
        label={"New Password"}
        isPassword
        value={password}
        onChangeText={(text: string) => setPassword(text)}
      />
      <Input
        label={"Confirm Password"}
        value={confirmPassword}
        isPassword
        onChangeText={(text: string) => setConfirmPassword(text)}
      />
      <Button
        disabled={!password.trimStart() || !confirmPassword.trimStart()}
        loading={isLoading}
        onPress={handleSubmit}
      >
        Submit
      </Button>
      <Footer />
    </View>
  );
}

export default Index;
