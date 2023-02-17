import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { styles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, setUserRegion } from "../../store/actions";
// import { showToast } from "../../utils";
import { Images } from "../../assets/images";
import { SCREENS } from "../../config";
import Navigation from "../../navigation/root";
import { Dropdown } from "../../components";

interface ILoginScreen {}

function Index(props: ILoginScreen) {
  const dispatch = useDispatch();
  // new file
  const homeOptions: any = [
    {
      name: "Register",
      icon: Images.farmer,
      route: SCREENS.REGISTER,
      description:
        "Register a farmer sub-agent agent producer organization number",
    },
    {
      name: "Inspection",
      icon: Images.inspection,
      description:
        "This involve the examination of trees, household members, fertilizers of the farmer",
    },
    {
      name: "Purchases",
      icon: Images.purchase,
      description:
        "Record Coffee Kgs Type, Farmer details and transaction details",
    },
    {
      name: "Logistics",
      icon: Images.logistics,
      description:
        "Record Branch delivery reports. Weigh notedetails grading reports(Dry mill) and contracts",
    },
    {
      name: "Training",
      icon: Images.training,
      description:
        "Record and trained modules and the farmer attendance sheet from here",
    },
  ];

  const { user, regionList, region } = useSelector((state: any) => state.auth);
  const [currentRegion, setcurrentRegion] = useState({});
  const handleLogout = () => {
    dispatch(clearUserData());
  };
  const handleSelect = (item: any) => {
    console.log("selected item ", item);
    dispatch(setUserRegion(item));
  };
  const onCardPress = (item: any) => {
    item.route ? Navigation.navigate(item.route) : null;
  };
  // console.log(" regionId>>>>>>>", region.id);

  useEffect(() => {
    if (region) {
      setcurrentRegion(region);
    }
  }, [region]);

  return (
    <View style={styles.container}>
      <Dropdown
        value={region}
        valueField={"name"}
        label="Select Region"
        options={regionList}
        onSelectOption={handleSelect}
      />

      <FlatList
        data={homeOptions}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onCardPress(item)}
            activeOpacity={0.5}
            style={styles.card}
          >
            <Image
              source={item.icon}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.cardHeading}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Index;
