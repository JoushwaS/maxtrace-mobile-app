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
import { useDispatch, useSelector } from "react-redux";

import { showToast } from "../../../utils";
import { getFarmersList } from "../../../config/api/farmerRegistration";
import { getFarmersListAction } from "../../../store/actions";
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
  const { farmersList } = useSelector((state: any) => state.farmerRegistration);
  const [refreshing, setRefreshing] = useState(false);

  const [filterCollectionList, setfilterCollectionList] = useState([]);
  const handleEditSelect = (item: any) => {
    Navigation.navigate(SCREENS.FARMER_REGISTRTION, {
      item: item,
    });
  };

  useEffect(() => {
    if (farmersList?.length != 0) {
      setRefreshing(false);
    }
  }, [farmersList]);

  const filterArrayByFullName = (
    input: text,
    originalArray?: Array<T>,
    setFilterList: any
  ) => {
    if (input !== "") {
      setSearch(input);
      const regex = new RegExp(input, "i"); // "i" flag for case-insensitive search
      const filteredArray = originalArray?.filter((obj: any) => {
        return (
          regex.test(obj.first_name) ||
          regex.test(obj.last_name) ||
          regex.test(obj.farmer_key)
        );
      });
      setFilterList(filteredArray);
    } else {
      setSearch("");
    }
  };
  const renderItem = (item: any) => {
    console.log("item.item new>>>", item.item);
    const imageUrl = item?.item.images?.map((img: any) => {
      if (img.type == "profile") {
        return img;
      }
    });

    return (
      <InfoCard
        headerText={item?.item.first_name}
        farmerID={item?.item.farmer_key}
        date_of_birth={item?.item?.date_of_birth}
        isFarmer={true}
        item={item.item}
        imagesList={item.item.images}
        // profilePicture={imageUrl[0]?.length != 0 ? imageUrl[0] : ""}
        location={{
          Address: item.item.farmer_location,
          Zone: item.item.zone_id,
        }}
        containerStyle={{ height: Metrix.VerticalSize(180) }}
        gender={item?.item?.gender}
        location={{
          Address: item?.item?.farmer_location,
          Zone: item?.item?.zone?.name,
        }}
        phone_number={item?.item.phone_primary}
        isEdit={false}
        handleEditSelect={handleEditSelect}
      />
      // <Text>hello</Text>
    );
  };
  const handleFetchFarmerList = async () => {
    await getFarmersList().then((res) => {
      console.log("farmerList here", res);
      dispatch(getFarmersListAction(res.data.data));
    });
  };
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
                console.log("searched text>>>", e);

                filterArrayByFullName(e, farmersList, setfilterCollectionList);
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
          {farmersList?.length != 0 && filterCollectionList?.length == 0 ? (
            <FlatList
              // columnWrapperStyle={styles.citiesContainer}
              data={farmersList}
              numColumns={1}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    handleFetchFarmerList();
                  }}
                />
              }
              style={styles.flatListStyle}
              // ListEmptyComponent={}
              // contentContainerStyle={{ alignItems: "center" }}
              // ListHeaderComponent={header()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={() => Math.random().toString()}
              renderItem={renderItem}
            ></FlatList>
          ) : (
            filterCollectionList?.length != 0 && (
              <FlatList
                // columnWrapperStyle={styles.citiesContainer}
                data={filterCollectionList}
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
                // ListEmptyComponent={}
                // contentContainerStyle={{ alignItems: "center" }}
                // ListHeaderComponent={header()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={() => Math.random().toString()}
                renderItem={renderItem}
              ></FlatList>
            )
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Index;
