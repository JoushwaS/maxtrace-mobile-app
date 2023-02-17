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
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { styles } from "./style";
import { Images } from "../../../assets/images";
import { Metrix, Colors } from "../../../config";
import { ICONS } from "../../../assets/icons";
import Navigation from "../../../navigation/root";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";

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
interface IAddCollectionCenter {
  route?: Object;
  user?: Object;
  region?: Object;
  zoneList?: Array<T>;
  handleAddCollectionCenter?: Function;
}
const window = Dimensions.get("window");

// type Region = {
//   latitude: Number;
//   longitude: Number;
//   latitudeDelta: Number;
//   longitudeDelta: Number;
// };
function Index({
  route,
  user,
  region,
  zoneList,
  handleAddCollectionCenter,
}: IAddCollectionCenter) {
  const [modalVisibleProfileImage, setModalVisibleProfileImage] =
    useState(false);

  const [profileImageFile, setprofileImageFile] = useState({
    fileUri: null,
    fileData: {},
  });
  const [cardIdImageFile, setcardIdImageFile] = useState({
    fileUri: null,
    fileData: {},
  });

  const [collectionCenterInfo, setcollectionCenterInfo] = useState({
    image: {},
    facility_id: "",
    facility_name: "",
    manager_name: "",
    mobile_number: "",
    address: "",
    region_id: 0,
    zone_id: 0,
  });
  const [collectionCenterDisplayInfo, setcollectionCenterDisplayInfo] =
    useState({
      image: {},
      facility_id_display: {},
      facility_name_display: "",
      manager_name_display: "",
      mobile_number_display: "",
      address_display: "",
      region_id_display: {},
      zone_id_display: {},
    });
  const bodyModal = (
    <>
      <TouchableOpacity
        onPress={() => {
          // setuploadType("gallery");
          handleUploadImage("gallery");
        }}
      >
        <View style={styles.flexContainer}>
          <Image
            style={styles.icon}
            source={ICONS.galleryIcon}
            resizeMode="contain"
          />

          <Text
            style={{
              fontSize: Metrix.FontMedium,
              padding: 2,
              color: Colors.Black,
            }}
          >
            Select From Gallery
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // setuploadType("camera");
          handleUploadImage("camera");

          // setModalVisibleProfileImage(!modalVisibleProfileImage);
        }}
      >
        <View style={styles.flexContainer}>
          <Image
            style={styles.icon}
            source={Images.cameraImage}
            resizeMode="contain"
          />

          <Text
            style={{
              color: Colors.Black,
              fontSize: Metrix.FontMedium,
              padding: 6,
            }}
          >
            Take a Photo
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
  const handleUploadImage = async (type: any, imageType: any) => {
    const mediaType = {
      title: type == "profile" ? "Select Profile Image" : "Select ID Card",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    // console.log("this.state.userImage?.uri", this.state.userImage);
    if (type == "camera") {
      await launchCamera(mediaType, (response: any) => {
        if (response.didCancel) {
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          console.log("response in image select>>", response.assets[0]);
          const sourceCamera = { uri: response.assets[0].uri };
          console.log({ sourceCamera });
          if (modalVisibleProfileImage) {
            setprofileImageFile({
              fileUri: sourceCamera,
              fileData: response.assets[0],
            });
            setModalVisibleProfileImage(false);
          }
        }
      });
    } else if (type == "gallery") {
      await launchImageLibrary(mediaType, (response: any) => {
        if (response.didCancel) {
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          console.log("response in image select>>", response.assets[0]);
          const source = { uri: response.assets[0].uri };
          console.log({ source });

          if (modalVisibleProfileImage) {
            setprofileImageFile({
              fileUri: source,
              fileData: response.assets[0],
            });
            setModalVisibleProfileImage(false);
          }
          // this.setState({
          //   userImage: source,
          //   imageFile: response,
          // });
          // }

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        }
      });
    }
  };
  const collectionCenterValidationSchema = yup.object().shape({
    facility_id: yup
      .string()
      .max(30, ({ max }) => `Maximum Facility ID length is ${max} characters`)
      .required("Facility Id Is Required*"),

    facility_name: yup
      .string()
      .max(30, ({ max }) => `Maximum Facility Name length is ${max} characters`)
      .required("Facility Name Is Required*"),
    manager_name: yup
      .string()
      .max(30, ({ max }) => `Maximum Manager Name length is ${max} characters`)
      .required("Manager Name Is Required*"),
    mobile_number: yup
      .string()
      // .matches(/(01)(\d){8}\b/, "Enter a valid phone number")
      .max(16, ({ max }) => `Maximum Phone Number length is ${max} characters`)
      .required("Phone Number Is Required*"),
    address: yup
      .string()

      .required("Address Is Required*"),
    zone_id: yup
      .number()

      .required("Zone Id Is Required*"),
  });
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
      <CustomModal
        show={modalVisibleProfileImage}
        setShow={setModalVisibleProfileImage}
        children={bodyModal}
      />
      <Formik
        validationSchema={collectionCenterValidationSchema}
        initialValues={{
          facility_id: "",
          facility_name: "",
          manager_name: "",
          address: "",

          mobile_number: "",
          zone_id: 0,
        }}
        onSubmit={(values) => {
          console.log("formik console\n ");
          console.log(region);

          const collectionObject = {
            facility_id: values?.facility_id,
            facility_name: values?.facility_name,
            manager_name: values?.manager_name,
            address: values?.address,

            mobile_number: values?.mobile_number,
            zone_id: parseFloat(values?.zone_id),
            region_id: region?.id,
            image: profileImageFile.fileData,
          };
          console.log({ collectionObject });
          // return;
          handleAddCollectionCenter(collectionObject);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={{ height: window.height * 1 }}>
            <View>
              <View style={styles.imageUploadContainer}>
                <View style={styles.cameraIconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisibleProfileImage(true);
                    }}
                  >
                    {profileImageFile.fileUri !== null ? (
                      <Image
                        style={styles.imageContainer}
                        source={profileImageFile.fileUri}
                      />
                    ) : (
                      <Image
                        source={Images.imageUploadPlaceholder}
                        style={styles.imageContainer}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.cameraIconContainerMini}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisibleProfileImage(true);
                    }}
                  >
                    <Image
                      source={ICONS.editIcon2}
                      style={styles.cameraIconMini}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.padding}>
              <Input
                // keyboardType={"numeric"}
                label="Facility ID"
                maxLength={50}
                name={"facility_id"}
                // onChangeText={(e) => {
                //   handleChange(e);
                //   setcollectionCenterInfo({
                //     ...collectionCenterInfo,
                //     facility_id: e,
                //   });
                // }}
                value={values.facility_id}
                onChangeText={handleChange("facility_id")}
              />

              {errors?.facility_id && touched.facility_id && (
                <Text style={styles.errorText}>{errors?.facility_id}</Text>
              )}
            </View>
            <View style={styles.padding}>
              <Input
                // keyboardType={"numeric"}
                name={"facility_name"}
                label="Facility Name"
                maxLength={50}
                // value={collectionCenterInfo.facility_name}
                // onChangeText={(e) => {
                //   setcollectionCenterInfo({
                //     ...collectionCenterInfo,
                //     facility_name: e,
                //   });
                // }}
                value={values.facility_name}
                onChangeText={handleChange("facility_name")}
              />

              {errors?.facility_name && touched.facility_name && (
                <Text style={styles.errorText}>{errors?.facility_name}</Text>
              )}
            </View>
            <View style={styles.padding}>
              <Input
                // keyboardType={"numeric"}
                name={"manager_name"}
                label="Manager Name"
                maxLength={50}
                // value={collectionCenterInfo.manager_name}
                // onChangeText={(e) => {
                //   setcollectionCenterInfo({
                //     ...collectionCenterInfo,
                //     manager_name: e,
                //   });
                // }}
                value={values.manager_name}
                onChangeText={handleChange("manager_name")}
              />

              {errors?.manager_name && touched.manager_name && (
                <Text style={styles.errorText}>{errors?.manager_name}</Text>
              )}
            </View>
            <View style={styles.padding}>
              <Input
                keyboardType={"numeric"}
                label="Mobile No."
                name={"mobile_number"}
                maxLength={16}
                // value={collectionCenterInfo.mobile_number}
                // onChangeText={(e) => {
                //   setcollectionCenterInfo({
                //     ...collectionCenterInfo,
                //     mobile_number: e.toString(),
                //   });
                // }}
                value={values.mobile_number}
                onChangeText={handleChange("mobile_number")}
              />
              {errors?.mobile_number && touched.mobile_number && (
                <Text style={styles.errorText}>{errors?.mobile_number}</Text>
              )}
            </View>

            <View style={{ marginBottom: Metrix.VerticalSize(40) }}>
              <ScrollView keyboardShouldPersistTaps="handled">
                <GoogleAutoComplete
                  label="Address"
                  name="address"
                  value={collectionCenterInfo?.address}
                  onChangeText={handleChange("address")}
                  setLocation={(
                    location: any,
                    locationbasic: any,
                    locationDetails: any
                  ) => {
                    console.log(" here log >>>>>", {
                      locationbasic,
                      locationDetails,
                      location,
                    });

                    setcollectionCenterInfo({
                      ...collectionCenterInfo,
                      address: locationbasic?.description,
                    });
                    setFieldValue("address", locationbasic?.description);
                    // console.log(
                    //   "locationDetails address  components>>>>>>>",
                    //   locationDetails?.address_components[
                    //     locationDetails?.address_components.length - 1
                    //   ]?.long_name
                    // );
                  }}
                />
              </ScrollView>

              {errors?.address && touched.address && (
                <Text style={styles.errorText}>{errors?.address}</Text>
              )}
            </View>

            <View style={styles.padding}>
              <Dropdown
                name={"zone_id"}
                value={collectionCenterDisplayInfo.zone_id_display}
                valueField={"name"}
                label="Zone"
                options={zoneList}
                onSelectOption={(item: any) => {
                  console.log("selected item zone >>>>>", item);
                  setcollectionCenterDisplayInfo({
                    ...collectionCenterDisplayInfo,

                    zone_id_display: item,
                  });

                  setcollectionCenterInfo({
                    ...collectionCenterInfo,
                    zone_id: item.id,
                  });
                  setFieldValue("zone_id", item.id);
                }}
              />
              {errors?.zone_id && touched.zone_id && (
                <Text style={styles.errorText}>{errors?.zone_id}</Text>
              )}
            </View>
            <View style={styles.padding}>
              <View style={styles.btnRow}>
                <View style={styles.btn}>
                  <Button
                    onPress={() => {
                      handleSubmit();
                      return;

                      // const collection_object = {
                      //   ...collectionCenterInfo,
                      //   image: profileImageFile.fileData,
                      // };
                    }}
                  >
                    Save
                  </Button>
                </View>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
}

export default Index;
