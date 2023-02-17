import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Button, Footer } from "../../../components";
// import { useDispatch } from "react-redux";
import Navigation from "../../../navigation/root";
import { Images } from "../../../assets/images";
import { Colors, Metrix, SCREENS } from "../../../config";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../../store/actions";
import { showToast } from "../../../utils";
import { getLanguages } from "../../../config/api/common";
import { ScrollView } from "react-native-gesture-handler";

interface ISelectLangProps {}

function Index(props: ISelectLangProps) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [lang, setLang] = useState<any>({});
  const [dropDownOpen, setDropDown] = useState<boolean>(false);
  const [langData, setLangdata] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const handleDropDownPress = () => {
    setDropDown(!dropDownOpen);
  };
  const handleSubmit = () => {
    Navigation.navigateAndReset(SCREENS.LOGIN);
    dispatch(setLanguage(lang?.code));
  };
  const hanldleSelectLang = (lang: any) => {
    setLang(lang);
    setDropDown(false);
  };
  const getData = async () => {
    try {
      setLoading(true);
      const { data: langData } = await getLanguages();
      setLoading(false);
      // console.log("langData", langData);
      setLangdata(langData.data);
      setDropDown(true);
    } catch (error) {
      setLoading(false);
      showToast({
        type: "error",
        text: error.message || "Failed to fetch languages list",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.image} source={Images.Logo} />
      <Text style={styles.heading}>Select Your Language</Text>
      <TouchableOpacity
        onPress={handleDropDownPress}
        activeOpacity={0.5}
        style={styles.input}
      >
        <View style={styles.flagRow}>
          {lang.title ? (
            <>
              <Image
                resizeMode="contain"
                style={styles.logo}
                source={{ uri: lang?.flag }}
              />
              <Text style={styles.inputText}>{lang?.title}</Text>
            </>
          ) : null}
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
      {dropDownOpen && (
        <ScrollView style={styles.dropdown}>
          {langData.map((item: any, i: number) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={i.toString()}
              style={{
                ...styles.dropdownRow,
                backgroundColor:
                  item.code === lang.code ? Colors.LigthGrey : Colors.White,
              }}
              onPress={() => hanldleSelectLang(item)}
            >
              <Image
                resizeMode="contain"
                style={styles.logo}
                source={{ uri: item.flag }}
              />
              <Text style={styles.inputText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <Button
        buttonStyle={{
          marginTop: Metrix.VerticalSize(32),
        }}
        disabled={!lang.code}
        loading={isLoading}
        onPress={handleSubmit}
      >
        Next
      </Button>
      <Footer />
    </View>
  );
}

export default Index;
