import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Button, Footer, Input } from "../../components";
import { useDispatch } from "react-redux";
import Navigation from "../../navigation/root";
import { Images } from "../../assets";
import { Colors, SCREENS } from "../../config";
import CheckBox from "@react-native-community/checkbox";
import { loginUser } from "../../config/api/auth";
import { showToast } from "../../utils";
import { setUserData } from "../../store/actions";

interface ISelectLangProps {}

function Index(props: ISelectLangProps) {
  const dispatch = useDispatch<any>();
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<any>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // console.log("formValues", formValues);
      const { data: userData } = await loginUser(formValues);
      console.log("userData", userData);
      setLoading(false);
      dispatch(setUserData(userData.data));
    } catch (error) {
      // console.log("error", error.response);
      showToast({
        type: "error",
        text: error?.response?.data?.message || error.message,
      });
      setLoading(false);
    }
  };

  const handleReset = () => {
    Navigation.navigate(SCREENS.RESET_PASSWORD);
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source={Images.Logo} />
      <Text style={styles.heading}>Login Below</Text>
      <Input
        value={formValues.email}
        label={"Email Address"}
        onChangeText={(text) =>
          setFormValues({
            ...formValues,
            email: text,
          })
        }
      />
      <Input
        isPassword
        label={"Password"}
        value={formValues.password}
        onChangeText={(text) =>
          setFormValues({
            ...formValues,
            password: text,
          })
        }
      />

      <View style={styles.bottomRow}>
        <TouchableOpacity
          onPress={() => setToggleCheckBox(!toggleCheckBox)}
          activeOpacity={0.5}
          style={styles.boxRow}
        >
          <CheckBox
            style={styles.checkbox}
            boxType="square"
            disabled={false}
            value={toggleCheckBox}
            onFillColor={Colors.Primary}
            onCheckColor={Colors.White}
            onTintColor={Colors.Primary}
            tintColors={{ true: Colors.Primary, false: Colors.LigthGrey }}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text style={{ ...styles.rowText, marginHorizontal: 10 }}>
            Remember me
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} activeOpacity={0.5}>
          <Text style={styles.rowText}>Reset Passoword?</Text>
        </TouchableOpacity>
      </View>
      <Button
        disabled={!formValues.email || !formValues.password}
        loading={isLoading}
        onPress={handleSubmit}
      >
        Log in
      </Button>
      <TouchableOpacity activeOpacity={0.5}>
        <Text style={styles.helpText}>Do You Need Help?</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
}

export default Index;
