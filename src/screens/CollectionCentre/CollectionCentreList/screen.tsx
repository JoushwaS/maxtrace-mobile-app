import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  Alert,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { styles } from "./style";
import { Images } from "../../../assets/images";
import { Metrix, Colors, SCREENS } from "../../../config";
import { ICONS } from "../../../assets/icons";
import Navigation from "../../../navigation/root";
import { InfoCard } from "../../../components/index";
import { generateRandomNumber } from "../../../utils/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Dropdown,
  Input,
  Button,
  CustomModal,
  GoogleAutoComplete,
} from "../../../components";
import { showToast } from "../../../utils";

import { useDispatch, useSelector } from "react-redux";
import { getCollectionCenterListAction } from "../../../store/actions/collectionCenterAction";

interface IAddCollectionCenter {
  route?: Object;
}
const window = Dimensions.get("window");

// type Region = {
//   latitude: Number;
//   longitude: Number;
//   latitudeDelta: Number;
//   longitudeDelta: Number;
// };
function Index({ route }: IAddCollectionCenter) {
  const [searchText, setSearch] = useState("");
  const dispatch = useDispatch<any>();

  const [refreshing, setRefreshing] = useState(false);

  const [filterCollectionList, setfilterCollectionList] = useState([]);
  const { collectionCenterList } = useSelector(
    (state: any) => state.collectionCenter
  );
  const handleEditSelect = (item: any) => {
    Navigation.navigate(SCREENS.ADD_COLLECTION_CENTRE, {
      item: item,
    });
  };
  const renderItem = (item: any) => {
    console.log("item collection address new>>>>", item.item);
    return (
      <InfoCard
        headerText={item.item.facility_name}
        item={item.item}
        profilePicture={item.item.image_url}
        location={{ Address: item.item.address, Zone: item.item?.zone?.name }}
        facilityID={item.item.id}
        phone_number={item.item.mobile_number}
        isEdit={false}
        handleEditSelect={handleEditSelect}
      />
    );
  };
  const filterArrayByFullName = (
    input: text,
    originalArray?: Array<T>,
    setFilterList: any
  ) => {
    if (input !== "") {
      setSearch(input);
      console.log("here", input);
      const regex = new RegExp(input, "i"); // "i" flag for case-insensitive search
      const filteredArray = originalArray?.filter((obj: any) => {
        return regex.test(obj.facility_name);
      });
      setFilterList(filteredArray);
    } else {
      setSearch("");
    }
  };
  function ciEquals(a: any, b: any) {
    return typeof a === "string" && typeof b === "string"
      ? a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0
      : a === b;
  }
  const handleSearch = (text: any) => {
    setSearch(text);
    if (text === "") {
      setfilterCollectionList(filterCollectionList);
    } else {
      const list = filterCollectionList.filter((item: any) => {
        if (ciEquals(text, item.facilityName)) {
          return item;
        }
      });
      console.log("list", list);
      setfilterCollectionList(list);
    }
  };
  const getCollectionCenter = async () => {
    await getCollectionCentersList()
      .then((res) => {
        console.log("reponse collection center here>>>>>>>", res?.data?.data);
        dispatch(getCollectionCenterListAction(res?.data?.data));
      })
      .catch((error) => {
        console.log(" collection center here error", error);
      });
  };
  useEffect(() => {
    if (collectionCenterList?.length != 0) {
      setRefreshing(false);
    } else {
      setRefreshing(true);
    }
  }, [collectionCenterList]);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={Platform.OS === "ios" ? false : true}
      // enableAutomaticScroll={Platform.OS === "ios"}
      extraHeight={200}
      extraScrollHeight={130}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
      enableAutomaticScroll={Platform.OS === "ios"}
      // innerRef={(ref) => {
      //   this.scroll = ref;
      // }}
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
      contentContainerStyle={styles.container}
    >
      <View style={{ height: window.height * 1 }}>
        <View style={styles.inputRow}>
          <View style={styles.row1}>
            <Input
              value={searchText}
              placeholder="Search Here"
              isSearch={true}
              onChangeText={(e) => {
                filterArrayByFullName(
                  e,
                  collectionCenterList,
                  setfilterCollectionList
                );
              }}
              // handleSearch={handleSearch}
              containerStyle={{
                backgroundColor: Colors.HEADER_BG,
                borderColor: "white",
              }}
            />
          </View>
        </View>

        <View style={styles.padding}>
          <ScrollView>
            <FlatList
              // columnWrapperStyle={styles.citiesContainer}
              data={collectionCenterList}
              numColumns={1}
              style={styles.flatListStyle}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    handleFetchFarmerList();
                  }}
                />
              }
              // contentContainerStyle={{ alignItems: "center" }}
              // ListHeaderComponent={header()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={() => Math.random().toString()}
              renderItem={renderItem}
            ></FlatList>
          </ScrollView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
