import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Button, Footer } from "../../components";
// import { useDispatch } from "react-redux";
import Navigation from "../../navigation/root";
import { Images } from "../../assets";
import { SCREENS } from "../../config";

interface ISelectLangProps {}

function Index(props: ISelectLangProps) {
  const handleSubmit = () => {
    Navigation.navigate(SCREENS.LOGIN);
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source={Images.Logo} />
      <Text style={styles.heading}>Select Your Language</Text>
      <TouchableOpacity activeOpacity={0.5} style={styles.input}>
        <View style={styles.flagRow}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={Images.USFlag}
          />
          <Text style={styles.inputText}>English</Text>
        </View>
        <View>
          <Image
            resizeMode="contain"
            style={styles.arrow}
            source={Images.arrowDown}
          />
        </View>
        <Text style={styles.placeHolderText}>Select Language</Text>
      </TouchableOpacity>
      <Button onPress={handleSubmit}>Next</Button>
      <Footer />
    </View>
  );
}

export default Index;
