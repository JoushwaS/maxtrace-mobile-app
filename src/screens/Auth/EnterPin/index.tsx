import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./style";
import { Button, Footer, Input } from "../../../components";
// import { useDispatch } from "react-redux";
import Navigation from "../../../navigation/root";
import { Images } from "../../../assets/images";
import { SCREENS } from "../../../config";
import { verifyPin } from "../../../config/api/auth";
import { showToast } from "../../../utils";

interface IEnterPinProps {}

function Index(props: IEnterPinProps) {
  const [pin, setPin] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setPin("");
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data: pinData } = await verifyPin({ pin });
      setLoading(false);
      if (pinData.status) {
        showToast({
          type: "success",
          text: pinData.message,
        });
        Navigation.navigate(SCREENS.NEW_PASSWORD, {
          pin,
        });
      }
      // console.log("pinData", pinData);
    } catch (error) {
      showToast({
        type: "error",
        text: error?.response?.data?.message || error.message,
      });
      setLoading(false);
    }
  };
  const onChangeText = (text: string) => {
    setPin(text);
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source={Images.Logo} />
      <Text style={styles.heading}>Enter Pin</Text>
      <Input
        label={"Enter Pin"}
        value={pin}
        maxLength={6}
        keyboardType={"decimal-pad"}
        onChangeText={onChangeText}
      />
      <Button
        disabled={!pin.trimStart()}
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
