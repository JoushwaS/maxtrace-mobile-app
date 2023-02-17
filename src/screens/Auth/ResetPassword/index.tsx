import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Button, Footer, Input } from "../../../components";
// import { useDispatch } from "react-redux";
import Navigation from "../../../navigation/root";
import { Images } from "../../../assets/images";
import { SCREENS } from "../../../config";
import { forgotPassword } from "../../../config/api/auth";
import { showToast } from "../../../utils";

interface IResetPasswordProps {}

function Index(props: IResetPasswordProps) {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setEmail("");
      setLoading(false);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data: resetData } = await forgotPassword({ email });
      setLoading(false);

      if (resetData.status) {
        showToast({
          type: "success",
          text: resetData.message || "Reset pin sent to your email address",
        });
        Navigation.navigate(SCREENS.ENTER_PIN);
      }
    } catch (error) {
      showToast({
        type: "error",
        text: error?.response?.data?.message || error.message,
      });
      setLoading(false);
    }
  };
  const onChangeText = (text: string) => {
    setEmail(text);
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source={Images.Logo} />
      <Text style={styles.heading}>Reset Password</Text>
      <Input
        label={"Email Address"}
        value={email}
        onChangeText={onChangeText}
      />
      <Button
        disabled={!email.trimStart()}
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
