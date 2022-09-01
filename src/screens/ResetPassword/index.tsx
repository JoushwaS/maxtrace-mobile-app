import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Button, Footer, Input } from "../../components";
// import { useDispatch } from "react-redux";
import Navigation from "../../navigation/root";
import { Images } from "../../assets";
import { SCREENS } from "../../config";

interface ISelectLangProps {}

function Index(props: ISelectLangProps) {
  const [email, setEmail] = useState<string>("");
  const handleSubmit = () => {
    Navigation.navigate(SCREENS.LOGIN);
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
      <Button onPress={handleSubmit}>Submit</Button>
      <Footer />
    </View>
  );
}

export default Index;
