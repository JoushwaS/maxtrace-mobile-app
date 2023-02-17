import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Button, Footer, Input } from "../../../components";
import { useDispatch } from "react-redux";
import Navigation from "../../../navigation/root";
import { Images } from "../../../assets/images";
import { Colors, SCREENS } from "../../../config";
import CheckBox from "@react-native-community/checkbox";
import { loginUser } from "../../../config/api/auth";
import { showToast } from "../../../utils";
import {
  setUserData,
  setUserInfoLocal,
  setUserRegionList,
} from "../../../store/actions";

interface ISelectLangProps {}

function Index(props: ISelectLangProps) {
  const dispatch = useDispatch<any>();
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  // return () => {
  //   setFormValues({
  //     email: "",
  //     password: "",
  //   });
  //   setLoading(false);
  //   setToggleCheckBox(false);
  // };
  // }, []);

  const [formValues, setFormValues] = useState<any>({
    company_domain: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data: userData } = await loginUser(formValues);
      if (userData.status && userData.data) {
        console.log("userData.data>>>>", userData.data.regions);
        setLoading(false);
        dispatch(setUserData(userData.data));
        dispatch(setUserInfoLocal(userData.data));
        dispatch(setUserRegionList(userData.data.regions));
        console.log("USER REGIONS>>>>>>>>", userData.data.regions);
        showToast({
          type: "success",
          text: "Login Successful",
        });
        // return;
        Navigation.navigate(SCREENS.HOME_STACK);
      }
    } catch (error: any) {
      console.log("error", error?.response);
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
      <View style={styles.padding}>
        <Input
          value={formValues.company_domain}
          label={"Domain"}
          onChangeText={(text) =>
            setFormValues({
              ...formValues,
              company_domain: text,
            })
          }
        />
      </View>
      <View style={styles.padding}>
        <Input
          value={formValues.email}
          label={"Email Address"}
          keyboardType="email-address"
          onChangeText={(text) =>
            setFormValues({
              ...formValues,
              email: text,
            })
          }
        />
      </View>
      <View style={styles.padding}>
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
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity
          onPress={() => setToggleCheckBox(!toggleCheckBox)}
          activeOpacity={0.5}
          style={styles.boxRow}
        >
          {/* <CheckBox
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
          </Text> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} activeOpacity={0.5}>
          <Text style={styles.rowText}>Reset Passoword?</Text>
        </TouchableOpacity>
      </View>
      <Button
        disabled={
          !formValues.email.trimStart() || !formValues.password.trimStart()
        }
        loading={isLoading}
        onPress={handleSubmit}
      >
        Log in
      </Button>
      {/* <TouchableOpacity activeOpacity={0.5}>
        <Text style={styles.helpText}>Do You Need Help?</Text>
      </TouchableOpacity> */}
      <Footer />
    </View>
  );
}

export default Index;
