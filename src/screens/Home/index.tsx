import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { styles } from "./style";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../store/actions";
import { showToast } from "../../utils";
import { Images } from "../../assets";

interface ILoginScreen {}

function Index(props: ILoginScreen) {
  const dispatch = useDispatch();

  const homeOptions: any = [
    {
      name: "Register",
      icon: Images.farmer,
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

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {}, []);

  const handleLogout = () => {
    dispatch(clearUserData());
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text numberOfLines={1} style={styles.heading}>
          Welcome, {user.full_name}
        </Text>
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.5}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={homeOptions}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.5} style={styles.card}>
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
