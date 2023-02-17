import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import { styles } from "./style";
import {
  Dropdown,
  Input,
  Button,
  CustomModal,
  CustomDropDown,
  DatePicker,
  GoogleAutoComplete,
  Loader,
} from "../../../components";
import {
  filterObject,
  generateFarmerKey,
  isObject,
  removeEmpty,
  showToast,
} from "../../../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Tabs from "./Tabs";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { Images } from "../../../assets/images";
import { Metrix, Colors } from "../../../config";
import { ICONS } from "../../../assets/icons";
import Navigation from "../../../navigation/root";
import { SCREENS } from "../../../config";
import farmerRegistration from "../../../store/reducers/farmerRegistration";
import moment from "moment";

interface IFarmerRegisterScreen {
  plotListSaved?: Array<Object>;
  handleDeletePlot?: Function;
  handleEditPlot?: Function;
  handleAddFarmerRegistration?: Function;
  farmerLookUpInfo?: Object[];
  user?: Object;
  region?: Object;
  editItem?: Object;
  loading?: boolean;
  isEdit?: boolean;
  zoneList?: Array<T>;
}

function Index({
  plotListSaved,
  handleEditPlot,
  handleAddFarmerRegistration,
  handleDeletePlot,
  farmerLookUpInfo,
  user,
  editItem,
  isEdit,
  loading,
  region,
  zoneList,
}: IFarmerRegisterScreen) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [modalVisibleProfileImage, setModalVisibleProfileImage] =
    useState(false);
  const [modalVisibleIDCardImage, setModalVisibleIDCardImage] = useState(false);
  const [showErrorModal, setshowErrorModal] = useState(false);
  const [toastDisplayed, setToastDisplayed] = useState(false);

  const [errorlist, seterrorlist] = useState([]);

  const [plotList, setplotList] = useState<string[]>([]);

  const [DOB, setDOB] = useState(new Date());
  const window = Dimensions.get("window");
  let error_list: any = [];
  console.log("value of eplotListSaved", plotListSaved);

  const [profileImageFile, setprofileImageFile] = useState({
    fileUri: null,
    fileData: {},
  });

  const [plotsQuantity, setplotsQuantity] = useState({
    owned: 0,
    rented: 0,
  });
  const [treesQuantity, settreesQuantity] = useState({
    productive: 0,
    non_productive: 0,
  });
  const [farmerLocation, setfarmerLocation] = useState({
    farmer_location: "",
    latitude: 0,
    longitude: 0,
    region: "",
  });
  const genderList = [
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
  ];
  console.log(
    "farmerLookUpInfo here plot_types>>>>>",
    farmerLookUpInfo?.plot_types
  );
  // update owned and rented text values
  const updatePlotState = (plotsList: any) => {
    let ownedPlots = 0;
    let rentedPlots = 0;
    plotsList.forEach((plot: any) => {
      console.log("here in update plot", plot);

      if (
        plot.plot_type_id === 1 ||
        plot.plot_type_id === 2 ||
        plot.plot_type_id === 3
      ) {
        ownedPlots++;
      } else if (plot.plot_type_id === 4) {
        rentedPlots++;
      }

      setplotsQuantity({
        ...plotsQuantity,
        owned: ownedPlots,
      });
      setplotsQuantity({
        ...plotsQuantity,
        rented: rentedPlots,
      });
      // setfarmerInfo({
      //   ...farmerInfo,
      //   rented_plots: rentedPlots,
      // });

      console.log("ownedPlots and rentedPlots", { ownedPlots, rentedPlots });
    });
  };
  function sumTreeValues(plotsList: any) {
    let productiveTrees = 0;
    let nonProductiveTrees = 0;

    plotsList.forEach((plot: any) => {
      productiveTrees += plot.productive_trees;
      nonProductiveTrees += plot.non_productive_trees;
    });

    settreesQuantity({
      ...treesQuantity,
      non_productive: nonProductiveTrees,
    });
    settreesQuantity({
      ...treesQuantity,
      productive: productiveTrees,
    });
  }

  const [selectGender, setselectGender] = useState("");
  const [phoneNumber, setphoneNumber] = useState({
    primary: "",
    secondary: "",
  });
  const [showInfoError, setshowInfoError] = useState(false);
  const [farmerInfo, setfarmerInfo] = useState({
    farmer_type: {},
    company_id: 0,
    farmer_key: "",
    gender: {},
    last_name: "",
    first_name: "",
    email: "",
    producerGroup: {},
    date_of_birth: "",
    seasonal_volume: 0,
    estimated_yield: 0,
    lead_farmer: {},
    sub_agent: {},
    agent: {},
    farmerLocation: {},
    collection_center_id: {},
    country_id: 0,
    region_id: 0,
    zone_id: {},
    plot_type: {},
    created_by: 0,
    image_profile: "",
    image_card: "",
    owned_plots: 0,
    rented_plots: 0,
    productive_trees: 0,
    non_productive_trees: 0,
  });
  const [cardIdImageFile, setcardIdImageFile] = useState({
    fileUri: null,
    fileData: {},
  });
  console.log("editItem here", editItem);

  const touchableProps: any = {
    activeOpcatiy: 0.5,
  };

  const renderHierarchyDropdown = (setFieldValue: any, errors: any) => {
    if (farmerInfo?.farmer_type?.id === 1) {
      return null; // don't show any dropdowns
    } else if (farmerInfo?.farmer_type?.id === 2) {
      return (
        <>
          {/*  Collection Centers DropDown */}

          <View style={styles.padding}>
            <Dropdown
              value={farmerInfo?.collection_center_id}
              valueField={"facility_name"}
              label="Collection Centers"
              options={farmerLookUpInfo?.collection_centers}
              name="collection_center_id"
              onSelectOption={(item: any) => {
                console.log("selected item >>>>>", item);
                setfarmerInfo({ ...farmerInfo, collection_center_id: item });
                setFieldValue("collection_center_id", item.id);
              }}
            />
            {errors?.collection_center_id && (
              <Text style={styles.errorText}>
                {errors?.collection_center_id}
              </Text>
            )}
          </View>
        </>
      );
    } else if (farmerInfo?.farmer_type?.id === 3) {
      return (
        <>
          {/*  Agent DropDown */}

          <View style={styles.padding}>
            <Dropdown
              value={farmerInfo?.agent}
              valueField={"first_name"}
              label="Agent Name"
              options={farmerLookUpInfo?.agents}
              name="agent_id"
              onSelectOption={(item: any) => {
                console.log("selected item >>>>>", item);
                // setfarmerInfo({ ...farmerInfo, farmer_type: item });
                setfarmerInfo({
                  ...farmerInfo,
                  agent: item,
                });

                setFieldValue("agent_id", item.id);
              }}
            />
            {errors?.agent_id && (
              <Text style={styles.errorText}>{errors?.agent_id}</Text>
            )}
          </View>

          {/* Sub Agent DropDown */}

          <View style={styles.padding}>
            <Dropdown
              value={farmerInfo?.sub_agent}
              valueField={"first_name"}
              label="Sub Agent Name"
              options={farmerLookUpInfo?.sub_agents}
              name="sub_agent_id"
              onSelectOption={(item: any) => {
                console.log("selected item >>>>>", item);
                setfarmerInfo({
                  ...farmerInfo,
                  sub_agent: item,
                });
                // setfarmerInfo({ ...farmerInfo, farmer_type: item });
                setFieldValue("sub_agent_id", item.id);
              }}
            />

            {errors?.sub_agent_id && (
              <Text style={styles.errorText}>{errors?.sub_agent_id}</Text>
            )}
          </View>

          {/* Lead Farmer DropDown */}

          <View style={styles.padding}>
            <Dropdown
              value={farmerInfo?.lead_farmer}
              valueField={"first_name"}
              label="Lead Farmer Name"
              options={farmerLookUpInfo?.lead_farmers}
              name="lead_farmer_id"
              onSelectOption={(item: any) => {
                console.log("selected item >>>>>", item);
                // setfarmerInfo({ ...farmerInfo, farmer_type: item });
                setfarmerInfo({
                  ...farmerInfo,
                  lead_farmer: item,
                });
                setFieldValue("lead_farmer_id", item.id);
              }}
            />
            {errors?.lead_farmer_id && (
              <Text style={styles.errorText}>{errors?.lead_farmer_id}</Text>
            )}
          </View>
        </>
      );
    } else if (farmerInfo?.farmer_type?.id === 4) {
      return (
        <>
          {/*  Agent DropDown */}

          <View style={styles.padding}>
            <Dropdown
              // value={region}
              value={farmerInfo?.agent}
              valueField={"first_name"}
              label="Agent Name"
              options={farmerLookUpInfo?.agents}
              name="agent_id"
              onSelectOption={(item: any) => {
                console.log("selected item >>>>>", item);
                // setfarmerInfo({ ...farmerInfo, farmer_type: item });
                setfarmerInfo({
                  ...farmerInfo,
                  agent: item,
                });
                setFieldValue("agent_id", item.id);
              }}
            />
            {errors?.agent_id && (
              <Text style={styles.errorText}>{errors?.agent_id}</Text>
            )}
          </View>

          {/* Sub Agent DropDown */}

          <View style={styles.padding}>
            <Dropdown
              // value={region}
              value={farmerInfo?.sub_agent}
              valueField={"first_name"}
              label="Sub Agent Name"
              options={farmerLookUpInfo?.sub_agents}
              name="sub_agent_id"
              onSelectOption={(item: any) => {
                console.log("selected item >>>>>", item);
                // setfarmerInfo({ ...farmerInfo, farmer_type: item });
                setfarmerInfo({
                  ...farmerInfo,
                  sub_agent: item,
                });
                setFieldValue("sub_agent_id", item.id);
              }}
            />

            {errors?.sub_agent_id && (
              <Text style={styles.errorText}>{errors?.sub_agent_id}</Text>
            )}
          </View>
        </>
      );
    } else if (farmerInfo?.farmer_type?.id === 5) {
      return (
        <>
          <View style={styles.padding}>
            <Dropdown
              // value={region}
              value={farmerInfo?.agent}
              valueField={"first_name"}
              label="Agent Name"
              options={farmerLookUpInfo?.agents}
              name="agent_id"
              onSelectOption={(item: any) => {
                console.log("selected item >>>>>", item);
                // setfarmerInfo({ ...farmerInfo, farmer_type: item });
                setfarmerInfo({
                  ...farmerInfo,
                  agent: item,
                });
                setFieldValue("agent_id", item.id);
              }}
            />
            {errors?.agent_id && (
              <Text style={styles.errorText}>{errors?.agent_id}</Text>
            )}
          </View>
        </>
      );
    } else {
      return null;
    }
  };
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
  const errorbodyModal = (
    <>
      <View>
        {error_list?.map((item) => {
          return <Text>{item}</Text>;
        })}
      </View>
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
          } else if (modalVisibleIDCardImage) {
            setcardIdImageFile({
              fileUri: sourceCamera,
              fileData: response.assets[0],
            });
            setModalVisibleIDCardImage(false);
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
    } else if (type == "gallery") {
      await launchImageLibrary(mediaType, (response: any) => {
        if (response.didCancel) {
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          console.log("response in image select>>", response.assets);
          const source = { uri: response.assets[0].uri };
          console.log({ source });

          if (modalVisibleProfileImage) {
            setprofileImageFile({
              fileUri: source,
              fileData: response.assets[0],
            });
            setModalVisibleProfileImage(false);
          } else if (modalVisibleIDCardImage) {
            setcardIdImageFile({
              fileUri: source,
              fileData: response.assets[0],
            });
            setModalVisibleIDCardImage(false);
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

  useEffect(() => {
    if (plotListSaved?.length != 0) {
      updatePlotState(plotListSaved);
      sumTreeValues(plotListSaved);
    }
  }, [plotListSaved]);
  useEffect(() => {
    const farmerKey = generateFarmerKey(
      region?.name,
      farmerInfo.farmer_type?.title,
      user.id
    );
    setfarmerInfo({ ...farmerInfo, farmer_key: farmerKey });
  }, [region, farmerInfo.farmer_type]);
  const farmerRegistrationValidationSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email"),
    firstName: yup
      .string()

      .required("First Name is required"),
    lastName: yup
      .string()

      .required("Last Name is required"),
    farmer_type_id: yup
      .string()

      .required("Farmer Account Type is required"),
    gender: yup
      .string()

      .required("Gender is required"),
    date_of_birth: yup.date(),

    zone_id: yup
      .string()

      .required("Zone is required*"),

    phone_primary: yup.string(),

    phone_secondary: yup.string(),

    farmer_location: yup
      .string()

      .required("Farmer Location is required"),
    lead_farmer_id: yup.string().optional(),
    sub_agent_id: yup.string().optional(),
    agent_id: yup.string().optional(),
    collection_center_id: yup.string().optional(),
    seasonal_volume: yup.string(),
    estimated_yield: yup.string(),
    // plot_type_id: yup
    //   .string()

    //   .required("Plot Type is required*"),
  });

  const errorPop = (errors: any) => {
    const isEmpty = Object.values(errors).every((x) => x === null || x === "");
    const errorList = Object.values(errors).filter(
      (value) => value !== null && value !== ""
    );

    setshowInfoError(!isEmpty);

    if (errorList.length > 0 && !toastDisplayed) {
      showToast({ type: "error", text: "Farmer Info Not Complete" });
      setToastDisplayed(true);
    } else if (errorList.length === 0 && toastDisplayed) {
      setToastDisplayed(false);
    }
  };
  useEffect(() => {
    if (error_list?.length != 0) {
      console.log("error list", error_list);
      // seterrorlist(error_list);
      setshowErrorModal(true);
    }
  }, [error_list]);

  const checkDropDown = (options: any, currentValue: any, key: any) => {
    const result = options?.map((item: any) => {
      if (item[key] === currentValue) return item;
    });
    console.log("checkDropDown", result[0]);
    return result[0];
  };

  const showEditImages = (Images: Array<T>) => {
    Images?.map((item) => {
      if (item.type == "profile") {
        setprofileImageFile({ fileData: item, fileUri: item.image_url });
      } else if (item.type == "card") {
        setcardIdImageFile({ fileData: item, fileUri: item.image_url });
      }
    });
  };
  useEffect(() => {
    if (isEdit) {
      setfarmerInfo({
        ...farmerInfo,

        first_name: editItem?.first_name,
        email: editItem?.email,
        last_name: editItem?.last_name,
        estimated_yield: editItem?.estimated_yield.toString(),
        seasonal_volume: editItem?.seasonal_volume.toString(),
        gender: checkDropDown(genderList, editItem?.gender, "value"),
        farmer_type: checkDropDown(
          farmerLookUpInfo?.farmer_types,
          editItem?.farmer_type_id,
          "id"
        ),
        // date_of_birth:
        owned_plots: editItem?.owned_plots,
        collection_center_id: checkDropDown(
          farmerLookUpInfo?.collection_centers,
          parseFloat(editItem?.collection_center_id),
          "id"
        ),
        agent: checkDropDown(
          farmerLookUpInfo?.agents,
          parseFloat(editItem?.agent_id),
          "id"
        ),
        sub_agent: checkDropDown(
          farmerLookUpInfo?.sub_agents,
          parseFloat(editItem?.sub_agent_id),
          "id"
        ),
        // productive_trees:
        zone_id: checkDropDown(zoneList, editItem?.zone_id, "id"),
      });
      // setDOB(editItem?.seasonal_volume)
      showEditImages(editItem?.images);
      setphoneNumber({
        ...phoneNumber,
        primary: editItem?.phone_primary,
        secondary: editItem?.phone_secondary,
      });
    }
  }, [editItem]);
  // useEffect(() => {
  //   if (showInfoError && !toastDisplayed) {
  //     showToast({ type: "error", text: "Farmer Info Not Complete" });
  //     setToastDisplayed(true);
  //   }
  // }, [showInfoError, toastDisplayed]);

  // Reset toastDisplayed state when showInfoError changes
  useEffect(() => {
    if (!showInfoError) {
      setToastDisplayed(false);
    }
  }, [showInfoError]);

  return (
    <KeyboardAwareScrollView
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
      contentContainerStyle={styles.container}
    >
      <Formik
        validationSchema={farmerRegistrationValidationSchema}
        initialValues={{
          farmer_type_id: "",
          firstName: "",
          lastName: "",
          gender: "",
          email: "",
          phone_primary: "",
          phone_secondary: "",
          date_of_birth: "",
          farmer_location: "",

          zone_id: "",
          lead_farmer_id: "",
          sub_agent_id: "",
          agent_id: "",
          collection_center_id: "",
          seasonal_volume: "",
          estimated_yield: "",
        }}
        onSubmit={(values) => {
          console.log("formik console\n ");
          const formattedDate = moment(values.date_of_birth).format(
            "YYYY-MM-DD"
          );
          let farmerSubmitObject = {
            company_id: user.company_id,
            farmer_type_id: parseFloat(values.farmer_type_id),
            // farmer_key: 1,
            gender: values.gender,
            first_name: values.firstName,
            last_name: values.lastName,
            phone_primary: values.phone_primary,
            phone_secondary: values?.phone_secondary,
            email: values?.email,
            date_of_birth: formattedDate,
            lead_farmer_id: values?.lead_farmer_id
              ? parseFloat(values?.lead_farmer_id)
              : "",
            sub_agent_id: values?.sub_agent_id
              ? parseFloat(values?.sub_agent_id)
              : "",
            agent_id: values?.agent_id ? parseFloat(values?.agent_id) : "",
            plotList: plotListSaved,
            country_id: user?.company?.country_id,
            region_id: region?.id,
            zone_id: parseFloat(values?.zone_id),
            created_by: user?.id,
            // image_profile: profileImageFile.fileData,
            farmer_location: values?.farmer_location,
            latitude: farmerLocation.latitude,
            longitude: farmerLocation.longitude,
            seasonal_volume: values?.seasonal_volume
              ? parseFloat(values?.seasonal_volume)
              : "",
            estimated_yield: values?.estimated_yield
              ? parseFloat(values?.estimated_yield)
              : "",
            collection_center_id: values.collection_center_id
              ? parseFloat(values?.collection_center_id)
              : "",
          };

          if (profileImageFile.fileData?.uri) {
            farmerSubmitObject["image_profile"] = profileImageFile.fileData;
          } else if (profileImageFile.fileData?.uri) {
            farmerSubmitObject["image_card"] = cardIdImageFile.fileData;
          }

          const farmer_obj = filterObject(farmerSubmitObject);
          // if (!isEdit) {
          handleAddFarmerRegistration(farmer_obj);
          // } else {
          //   console.log("update farmer info", farmerInfo);
          // }
        }}
        validator={() => ({})}
      >
        {({
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            {errorPop(errors)}

            <View>
              <Loader show={false} />
              <CustomModal
                show={modalVisibleProfileImage}
                setShow={setModalVisibleProfileImage}
                children={bodyModal}
              />
              <CustomModal
                show={modalVisibleIDCardImage}
                setShow={setModalVisibleIDCardImage}
                children={bodyModal}
              />
              {/* <CustomModal
                show={error_list?.length != 0 && showErrorModal}
                setShow={setshowErrorModal}
                children={errorbodyModal}
              /> */}
              <Dropdown
                name="farmer_type_id"
                value={farmerInfo.farmer_type}
                valueField={"title"}
                label="Account Type"
                options={farmerLookUpInfo?.farmer_types}
                onSelectOption={(item: any) => {
                  console.log("selected item >>>>>", item);
                  setfarmerInfo({ ...farmerInfo, farmer_type: item });
                  setFieldValue("farmer_type_id", item.id);
                }}
              />
              {errors?.farmer_type_id && touched.farmer_type_id && (
                <Text style={styles.errorText}>{errors?.farmer_type_id}</Text>
              )}
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              {/* Farmer Profile Info */}
              {activeTab == 0 ? (
                <>
                  <View style={styles.padding}>
                    <View style={styles.inputRow}>
                      {/* <View style={styles.row1}>
                        <Input
                          name="farmerID"
                          keyboardType={"numeric"}
                          label="Farmer ID"
                          editable={false}
                          value={farmerInfo.farmer_key}
                        />
                      </View> */}
                      <View style={styles.row2}>
                        <Dropdown
                          value={farmerInfo.gender}
                          valueField={"title"}
                          name="gender"
                          label="Select Gender"
                          editKey="value"
                          options={genderList}
                          onSelectOption={(item: any) => {
                            console.log("selected item zone >>>>>", item);
                            setfarmerInfo({ ...farmerInfo, gender: item });
                            setFieldValue("gender", item.value);
                          }}
                        />

                        {errors?.gender && touched.gender && (
                          <Text style={styles.errorText}>{errors?.gender}</Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={styles.padding}>
                    <View style={styles.inputRow}>
                      <View style={styles.row1}>
                        <Input
                          name="firstName"
                          label="First Name*"
                          value={farmerInfo.first_name}
                          onChangeText={(e) => {
                            // handleChange("firstName");
                            setFieldValue("firstName", e);
                            setfarmerInfo({
                              ...farmerInfo,
                              first_name: e,
                            });
                          }}
                        />
                        {errors?.firstName && touched.firstName && (
                          <Text style={styles.errorText}>
                            {errors?.firstName}
                          </Text>
                        )}
                      </View>
                      <View style={styles.row2}>
                        <Input
                          name="lastName"
                          label="Last Name*"
                          value={farmerInfo.last_name}
                          onChangeText={(e) => {
                            // handleChange("lastName");
                            setFieldValue("lastName", e);
                            setfarmerInfo({
                              ...farmerInfo,
                              last_name: e,
                            });
                          }}
                        />

                        {errors?.lastName && touched.lastName && (
                          <Text style={styles.errorText}>
                            {errors?.lastName}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={styles.padding}>
                    <Input
                      name="email"
                      keyboardType={"email-address"}
                      label="Email Address"
                      value={farmerInfo.email}
                      onChangeText={(e) => {
                        // handleChange("email");
                        setFieldValue("email", e);
                        setfarmerInfo({
                          ...farmerInfo,
                          email: e,
                        });
                      }}
                    />
                    {errors?.email && touched.email && (
                      <Text style={styles.errorText}>{errors?.email}</Text>
                    )}
                  </View>
                  <View style={styles.padding}>
                    {/* <View style={styles.row1}>
                      <Dropdown
                        value={farmerInfo.producerGroup}
                        valueField={"title"}
                        label="Producer Group"
                        options={farmerLookUpInfo?.producer_group_members}
                        onSelectOption={(item: any) => {
                          console.log("selected item >>>>>", item);
                          setfarmerInfo({ ...farmerInfo, producerGroup: item });
                        }}
                      />
                    </View> */}
                    {/* <View style={styles.row2}> */}
                    <DatePicker
                      label="Date Of Birth*"
                      date={DOB}
                      name="date_of_birth"
                      setDate={setDOB}
                      handleSelect={(item) => {
                        setFieldValue("date_of_birth", item);
                        setDOB(item);
                      }}
                    />
                    {/* {errors?.date_of_birth && touched.date_of_birth && (
                        <Text style={styles.errorText}>
                          {errors?.date_of_birth}
                        </Text>
                      )} */}
                    {/* </View> */}
                  </View>
                  <View style={styles.padding}>
                    <Input
                      name="phone_primary"
                      maxLength={16}
                      keyboardType={"phone-pad"}
                      label="Phone Number (Pri)"
                      value={phoneNumber.primary}
                      onChangeText={(e) => {
                        // handleChange("phonePrimary");
                        setFieldValue("phone_primary", e);
                        setphoneNumber({
                          ...phoneNumber,
                          primary: e.toString(),
                        });
                      }}
                    />
                    {errors?.phone_primary && touched.phone_primary && (
                      <Text style={styles.errorText}>
                        {errors?.phone_primary}
                      </Text>
                    )}
                  </View>
                  <View style={styles.padding}>
                    <Input
                      name="phone_secondary"
                      maxLength={16}
                      keyboardType={"phone-pad"}
                      label="Phone Number (Sec)"
                      value={phoneNumber.secondary}
                      onChangeText={(e) => {
                        // handleChange("phone_secondary");
                        setFieldValue("phone_primary", e);
                        setphoneNumber({
                          ...phoneNumber,
                          secondary: e.toString(),
                        });
                      }}
                    />
                    {errors?.phone_secondary && touched.phone_secondary && (
                      <Text style={styles.errorText}>
                        {errors?.phone_secondary}
                      </Text>
                    )}
                  </View>
                  {/*  Collection Centers DropDown */}
                  {renderHierarchyDropdown(setFieldValue, errors)}

                  <View style={styles.padding}>
                    <GoogleAutoComplete
                      label="Farmer Location"
                      value=""
                      name="farmer_location"
                      setLocation={(
                        location: any,
                        locationbasic: any,
                        locationDetails: any
                      ) => {
                        console.log(" here log >>>>>", {
                          locationbasic,
                        });

                        setFieldValue(
                          "farmer_location",
                          locationbasic?.description
                        );

                        setfarmerLocation({
                          ...farmerLocation,

                          latitude: location?.lat,
                          longitude: location?.lng,
                          farmer_location: locationbasic?.description,
                          region:
                            locationDetails?.address_components[
                              locationDetails?.address_components.length - 1
                            ]?.long_name,
                        });
                        console.log(
                          "locationDetails address  components>>>>>>>",
                          locationDetails?.address_components[
                            locationDetails?.address_components.length - 1
                          ]?.long_name
                        );
                      }}
                    />
                    {errors?.farmer_location && touched.farmer_location && (
                      <Text style={styles.errorText}>
                        {errors?.farmer_location}
                      </Text>
                    )}
                    <TouchableOpacity
                      {...touchableProps}
                      onPress={() => {
                        Navigation.navigate(SCREENS.ADD_PLOT, {
                          plotList: plotList,
                        });
                      }}
                    >
                      <Text style={styles.addPlotText}>Add Plot</Text>
                    </TouchableOpacity>

                    {!isEdit
                      ? plotListSaved.length != 0 && (
                          <View style={styles.plotList}>
                            {plotListSaved?.map((item: any, index: number) => {
                              return (
                                <>
                                  <View style={styles.plotListItem}>
                                    <Text style={styles.plotItemText}>{`Plot ${
                                      index + 1
                                    }`}</Text>
                                    <View
                                      style={styles.plotItemActionContainer}
                                    >
                                      <TouchableOpacity
                                        onPress={() => {
                                          // setuploadType("camera");
                                          handleEditPlot(item);
                                          // setModalVisibleProfileImage(!modalVisibleProfileImage);
                                        }}
                                      >
                                        <Image
                                          source={ICONS.editIcon}
                                          style={styles.icon}
                                        />
                                      </TouchableOpacity>

                                      <TouchableOpacity
                                        onPress={() => {
                                          // setuploadType("camera");

                                          handleDeletePlot(item.id);
                                          // setModalVisibleProfileImage(!modalVisibleProfileImage);
                                        }}
                                      >
                                        <Image
                                          source={ICONS.deleteIcon}
                                          style={styles.icon}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </>
                              );
                            })}
                          </View>
                        )
                      : editItem?.plots.length != 0 && (
                          <View style={styles.plotList}>
                            {plotListSaved?.map((item: any, index: number) => {
                              return (
                                <>
                                  <View style={styles.plotListItem}>
                                    <Text style={styles.plotItemText}>{`Plot ${
                                      index + 1
                                    }`}</Text>
                                    <View
                                      style={styles.plotItemActionContainer}
                                    >
                                      <TouchableOpacity
                                        onPress={() => {
                                          // setuploadType("camera");
                                          handleEditPlot(item);
                                          // setModalVisibleProfileImage(!modalVisibleProfileImage);
                                        }}
                                      >
                                        <Image
                                          source={ICONS.editIcon}
                                          style={styles.icon}
                                        />
                                      </TouchableOpacity>

                                      <TouchableOpacity
                                        onPress={() => {
                                          // setuploadType("camera");

                                          handleDeletePlot(item.id);
                                          // setModalVisibleProfileImage(!modalVisibleProfileImage);
                                        }}
                                      >
                                        <Image
                                          source={ICONS.deleteIcon}
                                          style={styles.icon}
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </>
                              );
                            })}
                          </View>
                        )}
                  </View>
                  <View style={styles.regionSection}>
                    <Text style={styles.locationHeading}>Location</Text>
                    {farmerLocation.region && (
                      <Text style={styles.locationText}>
                        Region {farmerLocation.region}
                      </Text>
                    )}
                  </View>
                  <View style={styles.padding}>
                    <Dropdown
                      value={farmerInfo.zone_id}
                      valueField={"name"}
                      label="Zone/Parish"
                      options={zoneList}
                      name="zone_id"
                      onSelectOption={(item: any) => {
                        console.log("selected item zone >>>>>", item);
                        setfarmerInfo({ ...farmerInfo, zone_id: item });
                        setFieldValue("zone_id", item?.id);
                      }}
                    />
                    {errors?.zone_id && touched.zone_id && (
                      <Text style={styles.errorText}>{errors?.zone_id}</Text>
                    )}
                  </View>
                </>
              ) : (
                <>
                  {/* Picture And ID card Info  */}

                  <View style={styles.imageUploadSection}>
                    {/* Profile Image Upload  */}
                    <View style={styles.ImageUploadContainer}>
                      <Text style={styles.ImageUploadContainerText}>
                        Profile Picture
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisibleProfileImage(true);
                          return;
                          // AddImage("profile");
                        }}
                      >
                        <View style={styles.cameraIconContainer}>
                          <Image
                            source={ICONS.cameraIcon}
                            style={styles.cameraIcon}
                            resizeMode="contain"
                          />
                        </View>
                        {isEdit ? (
                          <Image
                            style={styles.imageContainer}
                            source={
                              profileImageFile.fileUri
                                ? { uri: profileImageFile.fileUri }
                                : Images.imageUploadPlaceholder
                            }
                          />
                        ) : profileImageFile?.fileUri !== null ? (
                          <Image
                            style={styles.imageContainer}
                            source={profileImageFile.fileUri}
                          />
                        ) : (
                          <Image
                            style={styles.imageContainer}
                            source={Images.imageUploadPlaceholder}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    {/* Id Card Image Upload  */}
                    <View style={styles.ImageUploadContainer}>
                      <Text style={styles.ImageUploadContainerText}>
                        Id Card
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisibleIDCardImage(true);
                          return;
                          // AddImage("profile");
                        }}
                      >
                        <View style={styles.cameraIconContainer}>
                          <Image
                            source={ICONS.cameraIcon}
                            style={styles.cameraIcon}
                            resizeMode="contain"
                          />
                        </View>
                        {isEdit ? (
                          <Image
                            style={styles.imageContainer}
                            source={
                              cardIdImageFile.fileUri
                                ? { uri: cardIdImageFile.fileUri }
                                : Images.imageUploadPlaceholder
                            }
                          />
                        ) : (
                          <Image
                            style={styles.imageContainer}
                            source={
                              cardIdImageFile.fileUri
                                ? cardIdImageFile?.fileUri
                                : Images.imageUploadPlaceholder
                            }
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.padding}>
                    {/* <Dropdown
                      value={farmerInfo.plot_type}
                      valueField={"title"}
                      label="Plot Type"
                      name="plot_type_id"
                      options={farmerLookUpInfo?.plot_types}
                      onSelectOption={(item: any) => {
                        console.log("selected item zone >>>>>", item);
                        setfarmerInfo({ ...farmerInfo, plot_type: item });
                        setFieldValue("plot_type_id", item?.id);
                      }}
                    /> */}
                    {/* {errors?.plot_type_id && touched.plot_type_id && (
                      <Text style={styles.errorText}>
                        {errors?.plot_type_id}
                      </Text>
                    )} */}
                  </View>
                  <View style={styles.padding}>
                    <View style={styles.inputRow}>
                      <View style={styles.row1}>
                        <Input
                          name="ownedPlots"
                          keyboardType={"numeric"}
                          label="Owned Plots"
                          editable={false}
                          value={plotsQuantity.owned.toString()}
                          // onChangeText={(e) => {
                          //   handleChange("ownedPlots");
                          //   setfarmerInfo({
                          //     ...farmerInfo,
                          //     owned_plots: parseFloat(e),
                          //   });
                          // }}
                        />
                      </View>
                      <View style={styles.row2}>
                        <Input
                          name="rentedPlots"
                          keyboardType={"numeric"}
                          label="Rented Plots"
                          editable={false}
                          value={plotsQuantity.rented.toString()}
                          // onChangeText={(e) => {
                          //   handleChange("rentedPlots");
                          //   setfarmerInfo({
                          //     ...farmerInfo,
                          //     rented_plots: parseFloat(e),
                          //   });
                          // }}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.padding}>
                    <View style={styles.inputRow}>
                      <View style={styles.row1}>
                        <Input
                          name="productiveTrees"
                          keyboardType={"numeric"}
                          label="Productive Trees"
                          editable={false}
                          value={treesQuantity.productive.toString()}
                          // onChangeText={(e) => {
                          //   handleChange("productiveTrees");
                          //   setfarmerInfo({
                          //     ...farmerInfo,
                          //     productive_trees: parseFloat(e),
                          //   });
                          // }}
                        />
                      </View>
                      <View style={styles.row2}>
                        <Input
                          name="nonproductiveTrees"
                          keyboardType={"numeric"}
                          label="Non Productive Trees"
                          editable={false}
                          value={treesQuantity.non_productive.toString()}
                          // onChangeText={(e) => {
                          //   handleChange("nonproductiveTrees");
                          //   setfarmerInfo({
                          //     ...farmerInfo,
                          //     non_productive_trees: parseFloat(e),
                          //   });
                          // }}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.padding}>
                    <View style={styles.inputRow}>
                      <View style={styles.row1}>
                        <Input
                          keyboardType={"numeric"}
                          label="Seasonal Volume in Kgs"
                          value={farmerInfo?.seasonal_volume}
                          name="seasonal_volume"
                          onChangeText={(e) => {
                            handleChange("seasonalVolume");
                            setFieldValue("seasonal_volume", e);
                            setfarmerInfo({
                              ...farmerInfo,
                              seasonal_volume: parseFloat(e),
                            });
                          }}
                        />

                        {errors?.seasonal_volume && touched.seasonal_volume && (
                          <Text style={styles.errorText}>
                            {errors?.seasonal_volume}
                          </Text>
                        )}
                      </View>
                      <View style={styles.row2}>
                        <Input
                          name="estimated_yield"
                          keyboardType={"numeric"}
                          label="Estimate Yield Per Year"
                          value={farmerInfo.estimated_yield}
                          onChangeText={(e) => {
                            handleChange("estimatedYield");
                            setFieldValue("estimated_yield", e);
                            setfarmerInfo({
                              ...farmerInfo,
                              estimated_yield: parseFloat(e),
                            });
                          }}
                        />
                        {errors?.estimated_yield && touched.estimated_yield && (
                          <Text style={styles.errorText}>
                            {errors?.estimated_yield}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </>
              )}
              <View style={styles.padding}>
                <View style={styles.btnRow}>
                  <View style={styles.btn}>
                    <Button
                      bgWhite
                      textBlack
                      borderBlack
                      onPress={() => {
                        if (activeTab == 0) {
                          Navigation.goBack();
                        } else {
                          setActiveTab(0);
                        }
                      }}
                    >
                      Back
                    </Button>
                  </View>
                  <View style={styles.btn}>
                    <Button
                      loading={loading}
                      onPress={() => {
                        if (!isEdit) {
                          if (activeTab == 1) {
                            handleSubmit();
                          }

                          setActiveTab(1);
                        } else {
                          console.log("edit ");
                        }
                      }}
                    >
                      {!isEdit
                        ? activeTab == 0
                          ? "Next"
                          : "Register"
                        : "Update"}
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
}

export default Index;
