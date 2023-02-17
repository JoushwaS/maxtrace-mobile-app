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
import axios from "axios";
import { styles } from "./style";
import { Images } from "../../../assets/images";
import { Metrix, Colors } from "../../../config";
import { ICONS } from "../../../assets/icons";
import Navigation from "../../../navigation/root";
import RNLocation from "react-native-location";
import Geolocation from "react-native-geolocation-service";
import { generateRandomNumber } from "../../../utils/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Dropdown,
  Input,
  Button,
  CustomModal,
  GoogleAutoComplete,
} from "../../../components";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import { showToast } from "../../../utils";
import { Formik } from "formik";
import * as yup from "yup";
interface IAddPlotScreen {
  handleAddPlot: (plotInfo: Object) => void;
  handleUpdatePlotInfo: (plotInfo: Object) => void;
  plotListSaved: Array<Object>;
  isPlotAdded: Boolean;
  farmerLookUpInfo: Object[];
  editPlotInfo?: {
    non_productive_immature_trees: string;
    non_productive_trees: string;
    plot_type_id: string;
    plotType: object;
    productive_trees: string;
    spacing: number;
    // id: number;
    latitude: number;
    longitude: number;
    address: string;
  };
  route?: Object;
}

// type Region = {
//   latitude: Number;
//   longitude: Number;
//   latitudeDelta: Number;
//   longitudeDelta: Number;
// };
function Index({
  handleAddPlot,
  handleUpdatePlotInfo,
  plotListSaved,
  isPlotAdded,
  editPlotInfo,
  farmerLookUpInfo,
  route,
}: IAddPlotScreen) {
  const [geoLocation, setGeoLocation] = useState({
    lng: 37.78825,
    lat: -122.4324,
    latDelta: 0.015,
    lngDelta: 0.0121,
  });
  const plotValidationSchema = yup.object().shape({
    productive_trees: yup.string(),

    non_productive_trees: yup.string(),

    non_productive_immature_trees: yup.string(),

    plot_location: yup
      .string()

      .required("Plot Location is required"),
    plot_type_id: yup
      .string()

      .required("Plot Type is required*"),
  });
  const [circleRadius, setcircleRadius] = useState({
    width: "",
    breadth: "",
  });
  const [plotInfo, setplotInfo] = useState({
    plotType: {},
    // id: 0,
    plot_type_id: 0,
    productive_trees: 0,
    non_productive_trees: 0,
    non_productive_immature_trees: 0,
    spacing: "",
    latitude: 0,
    longitude: 0,
    address: "",
  });
  const [spacing, setspacing] = useState(0);
  const [region, setregion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  // console.log("prodvided>>>", editPlotInfo);

  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [addressObj, setaddressObj] = useState({});
  const [fromMap, setfromMap] = useState(false);
  const [isMapReady, setIsMapready] = useState(false);
  const latitudeDelta = 0.015;
  const longitudeDelta = 0.0121;
  let autoCompleteRef = useRef();
  const window = Dimensions.get("window");

  const REVERSE_GEOCODE_URL =
    "https://maps.googleapis.com/maps/api/geocode/json";
  const GOOGLE_API_KEY = "AIzaSyBwgtDTFQB5MD6foQLlDIuXnzZYZf5YvpI";

  const [mapCoordinates, setmapCoordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  // Map functions
  const setLocation = async (
    location: any,
    locationbasic: any,
    locationDetails: any,
    setFieldValue: any
  ) => {
    console.log("set location", location);

    let address = locationbasic.description.split(",");
    let area,
      city = null;
    if (address.length > 0) {
      area = address[0];
      city = address[1];
    }
    setFieldValue("plot_location", locationbasic?.description);
    let fullAddress = locationDetails.formatted_address;
    const splitAddress = fullAddress.split(",");
    console.log({ fullAddress });
    // let addressObj = {
    //   customerId: customer?.id,
    //   fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
    //   area: area,
    //   city: city,
    //   lat: "" + location.lat,
    //   lng: "" + location.lng,
    //   comment: "Default",
    // };
    setlatitude(location.lat);
    setlongitude(location.lng);
    // setaddressObj(addressObj);
    setregion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });

    setplotInfo({
      ...plotInfo,
      latitude: location.lat,
      longitude: location.lng,
      address: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
    });
    // await autoCompleteRef?.current?.animateToRegion(
    //   {
    //     latitude: location.lat,
    //     longitude: location.lng,
    //     latitudeDelta: latitudeDelta,
    //     longitudeDelta: longitudeDelta,
    //   },
    //   1000
    // );
  };

  const onMapLayout = () => {
    setIsMapready(true);
  };

  const getLocationFromMap = async ({ latitude, longitude }) => {
    try {
      const googleAddresses = await reverseGeocode(latitude, longitude);
      // console.log("googleAddresses", googleAddresses[0]);
      if (googleAddresses.length > 0) {
        autoCompleteRef?.current?.setAddressText(
          googleAddresses[0]["formatted_address"]
        );
        const fullAddress = googleAddresses[0]["formatted_address"];
        const { lat, lng } = googleAddresses[0].geometry.location;
        const splitAddress = fullAddress.split(",");

        const addressObj = {
          fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
          area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
          city: splitAddress[splitAddress.length - 2],
          // street: splitAddress[0],
          // state: splitAddress[1],
          lat: "" + lat,
          lng: "" + lng,
          comment: "Default",
        };

        setlatitude(latitude);
        setlongitude(longitude);
        setregion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        });
        setaddressObj(addressObj);
        // setLoading(isLoading);

        setfromMap(true);
      }
    } catch (error: any) {
      console.log("getLocationFromMap", error.message);
    }
    // } else {
    //   // alert("inside the else");
    // }
  };
  const reverseGeocode = async (lat: any, lng: any) => {
    return axios
      .get(`${REVERSE_GEOCODE_URL}?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`)
      .then((res) => {
        console.log("REVERSE_GEOCODE_URLREVERSE_GEOCODE_URL", res.data);
        if (res.data.results) {
          if (res.data.results.length > 0) {
            return res.data.results;
          }
        }

        return null;
      })
      .catch((ex) => {
        console.log("ex,", ex);
        return null;
      });
  };
  const handleDragMarkerEnd = async (e: any) => {
    console.log("e.nativeEvent.coordinate", e.nativeEvent.coordinate);
    setlatitude(e.nativeEvent.coordinate.latitude);
    setlongitude(e.nativeEvent.coordinate.longitude);

    const googleAddresses = await reverseGeocode(latitude, longitude);
    console.log("googleAddresses drag marker", googleAddresses[0]);
    if (googleAddresses.length > 0) {
      autoCompleteRef?.current?.setAddressText(
        googleAddresses[0]["formatted_address"]
      );

      setplotInfo({
        ...plotInfo,
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        address: googleAddresses[0]["formatted_address"],
      });
    }
  };

  const getLocations = async () => {
    try {
      // setLoading(true);
      let granted = await RNLocation.requestPermission({
        ios: "always",
        android: {
          detail: "coarse",
        },
      });
      // console.log("granted ", granted);
      if (!granted) {
        // showToast({
        //   text: t("Location Permission denied"),
        //   type: "error",
        // });

        let googleAddresses = await reverseGeocode(21.4925, 39.17757);
        let address = googleAddresses[0]["formatted_address"];

        let splitAddress = address.split(",");
        // setFieldValue("farmer_location", address);
        // let stateAddress = {
        //   customerId: customer?.id,
        //   area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
        //   // street: splitAddress[0],
        //   // state: splitAddress[1],
        //   city: splitAddress[splitAddress.length - 2],
        //   fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
        //   lat: location?.latitude,
        //   lng: location?.longitude,
        //   comment: "Default",
        // };
        setlatitude(21.4925);
        setlongitude(39.17757);

        setregion({
          latitudeDelta: 0,
          longitudeDelta: 0,
          latitude: 21.4925,
          longitude: 39.17757,
        });
        // setaddressObj(stateAddress);
        setfromMap(true);
      } else {
        console.log("location grante>>>", granted);
        Geolocation.getCurrentPosition(
          async (success) => {
            let location = {
              latitude: success.coords.latitude.toString(),
              longitude: success.coords.longitude.toString(),
            };

            let googleAddresses = await reverseGeocode(
              location?.latitude,
              location?.longitude
            );
            // console.log("googleAddresses", googleAddresses);
            if (!googleAddresses) {
              showToast({
                type: "error",
                text: "No address found",
              });
            }
            let address = googleAddresses[0]["formatted_address"];

            autoCompleteRef?.current?.setAddressText(
              googleAddresses[0]["formatted_address"]
            );
            let splitAddress = address.split(",");
            console.log("splitAddress", splitAddress);
            setplotInfo({
              ...plotInfo,
              latitude: parseFloat(location?.latitude),
              longitude: parseFloat(location?.longitude),
              address: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
            });
            const farmerLocation = `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`;
            // setFieldValue("farmer_location", farmerLocation);
            // let stateAddress = {
            //   customerId: customer?.id,
            //   area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
            //   // street: splitAddress[0],
            //   // state: splitAddress[1],
            //   city: splitAddress[splitAddress.length - 2],
            //   fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
            //   lat: location?.latitude,
            //   lng: location?.longitude,
            //   comment: "Default",
            // };

            setlatitude(parseFloat(location?.latitude));
            setlongitude(parseFloat(location?.longitude));
            // setaddressObj(stateAddress);
            setregion({
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
              latitude: parseFloat(location?.latitude),
              longitude: parseFloat(location?.longitude),
            });
            console.log("region,", location);
            // setLoading(false);

            // const cI = setInterval(() => {
            //   if (mapRef && isMapReady) {
            //     mapRef.current.animateToRegion(
            //       {
            //         latitudeDelta,
            //         longitudeDelta,
            //         latitude: location?.latitude,
            //         longitude: location?.longitude,
            //       },
            //       2000
            //     );
            //     clearInterval(cI);
            //   }
            // }, 1000);
          },
          (e) => {
            showToast({
              type: "error",
              text: e.message,
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
          }
        );
      }
    } catch (error) {
      setlatitude(0);
      setlongitude(0);
      setregion({
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        latitude: 0,
        longitude: 0,
      });
    }
  };
  useEffect(() => {
    if (!editPlotInfo) {
      // const ID = generateRandomNumber();
      // console.log("generated ID new ", { ID });
      // setplotInfo({ ...plotInfo, id: ID });
    }
  }, []);

  useEffect(() => {
    if (geoLocation) {
      console.log("lcoation change", geoLocation);

      setregion({
        latitude: geoLocation?.lat,
        longitude: geoLocation?.lng,
        latitudeDelta: geoLocation?.latDelta,
        longitudeDelta: geoLocation?.lngDelta,
      });
      setmapCoordinates({
        latitude: geoLocation.lat,
        longitude: geoLocation.lng,
      });
    }
  }, [geoLocation]);

  useEffect(() => {
    if (!editPlotInfo) {
      getLocations();
    }
  }, []);
  useEffect(() => {
    if (editPlotInfo) {
      const {
        non_productive_immature_trees,
        non_productive_trees,
        plot_type_id,
        plotType,
        productive_trees,
        latitude,
        longitude,
        address,
        spacing,
        id,
      } = editPlotInfo;
      // const {  } = plotLocation;
      console.log("id>>>>>>>>>>>>>>>>\n", id);
      getLocationFromMap({ latitude, longitude });
      console.log({
        non_productive_immature_trees,
        non_productive_trees,
        plot_type_id,
        plotType,
        productive_trees,

        spacing,
        id,
      });
      setplotInfo({
        ...plotInfo,
        non_productive_immature_trees: parseFloat(
          non_productive_immature_trees
        ),
        non_productive_trees: parseFloat(non_productive_trees),
        plot_type_id: plotType.id,
        plotType: plotType,
        // id: id,
        productive_trees: parseFloat(productive_trees),
        spacing: spacing.toString(),
        latitude: latitude,
        longitude: longitude,
        address: address,
      });
      // setplotInfo({
      //   ...plotInfo,
      //   non_productive_immature_trees: non_productive_immature_trees.toString(),
      //   non_productive_trees: non_productive_trees.toString(),
      //   // plot_type_id: plot_type_id,
      //   plotType: plotType,
      //   productive_trees: productive_trees.toString(),
      // });

      // setcircleRadius({
      //   width: width,
      //   breadth: breadth,
      // });
    }
  }, [editPlotInfo]);

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
      <Formik
        validationSchema={plotValidationSchema}
        initialValues={{
          productive_trees: "",
          non_productive_trees: "",
          non_productive_immature_trees: "",
          plot_location: "",
          plot_type_id: "",
        }}
        onSubmit={(values) => {
          console.log("formik console\n ", values);
          let plot_spacing =
            parseFloat(circleRadius.width) * parseFloat(circleRadius.breadth);
          const plotObject = {
            address: values.plot_location,
            longitude: plotInfo.longitude,
            latitude: plotInfo.latitude,
            productive_trees: parseFloat(values.productive_trees),
            non_productive_trees: parseFloat(values.non_productive_trees),
            non_productive_immature_trees: parseFloat(
              values.non_productive_immature_trees
            ),
            plot_type_id: parseFloat(values.plot_type_id),
            spacing: plot_spacing.toString(),
          };
          // console.log({ plotObject });
          // return;
          handleAddPlot(plotObject);
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
            <View style={{ height: window.height * 1 }}>
              <View style={styles.autoCompleteTextBox}>
                <ScrollView keyboardShouldPersistTaps="handled">
                  <GoogleAutoComplete
                    label="Map Plotting"
                    value=""
                    name="plot_location"
                    onChangeText={() => {}}
                    geoLocation={geoLocation}
                    latitude={latitude}
                    setLocation={(
                      location: any,
                      locationbasic: any,
                      locationDetails: any
                    ) => {
                      setLocation(
                        location,
                        locationbasic,
                        locationDetails,
                        setFieldValue
                      );
                    }}
                    setlatitude={setlatitude}
                    setlongitude={setlongitude}
                    setfromMap={setfromMap}
                    setaddressObj={setaddressObj}
                    autoCompleteRef={autoCompleteRef}
                    setGeoLocation={setGeoLocation}
                    getLocations={async () => {
                      try {
                        // setLoading(true);
                        let granted = await RNLocation.requestPermission({
                          ios: "always",
                          android: {
                            detail: "coarse",
                          },
                        });
                        // console.log("granted ", granted);
                        if (!granted) {
                          // showToast({
                          //   text: t("Location Permission denied"),
                          //   type: "error",
                          // });

                          let googleAddresses = await reverseGeocode(
                            21.4925,
                            39.17757
                          );
                          let address = googleAddresses[0]["formatted_address"];

                          let splitAddress = address.split(",");
                          setFieldValue("farmer_location", address);
                          // let stateAddress = {
                          //   customerId: customer?.id,
                          //   area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
                          //   // street: splitAddress[0],
                          //   // state: splitAddress[1],
                          //   city: splitAddress[splitAddress.length - 2],
                          //   fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
                          //   lat: location?.latitude,
                          //   lng: location?.longitude,
                          //   comment: "Default",
                          // };
                          setlatitude(21.4925);
                          setlongitude(39.17757);

                          setregion({
                            latitudeDelta: 0,
                            longitudeDelta: 0,
                            latitude: 21.4925,
                            longitude: 39.17757,
                          });
                          // setaddressObj(stateAddress);
                          setfromMap(true);
                        } else {
                          console.log("location grante>>>", granted);
                          Geolocation.getCurrentPosition(
                            async (success) => {
                              let location = {
                                latitude: success.coords.latitude.toString(),
                                longitude: success.coords.longitude.toString(),
                              };

                              let googleAddresses = await reverseGeocode(
                                location?.latitude,
                                location?.longitude
                              );
                              // console.log("googleAddresses", googleAddresses);
                              if (!googleAddresses) {
                                showToast({
                                  type: "error",
                                  text: "No address found",
                                });
                              }
                              let address =
                                googleAddresses[0]["formatted_address"];

                              autoCompleteRef?.current?.setAddressText(
                                googleAddresses[0]["formatted_address"]
                              );
                              let splitAddress = address.split(",");
                              console.log("splitAddress", splitAddress);
                              setplotInfo({
                                ...plotInfo,
                                latitude: parseFloat(location?.latitude),
                                longitude: parseFloat(location?.longitude),
                                address: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
                              });
                              const farmerLocation = `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`;
                              setFieldValue("farmer_location", farmerLocation);
                              // let stateAddress = {
                              //   customerId: customer?.id,
                              //   area: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
                              //   // street: splitAddress[0],
                              //   // state: splitAddress[1],
                              //   city: splitAddress[splitAddress.length - 2],
                              //   fullAddress: `${splitAddress[0]},${splitAddress[1]},${splitAddress[2]}`,
                              //   lat: location?.latitude,
                              //   lng: location?.longitude,
                              //   comment: "Default",
                              // };

                              setlatitude(parseFloat(location?.latitude));
                              setlongitude(parseFloat(location?.longitude));
                              // setaddressObj(stateAddress);
                              setregion({
                                latitudeDelta: latitudeDelta,
                                longitudeDelta: longitudeDelta,
                                latitude: parseFloat(location?.latitude),
                                longitude: parseFloat(location?.longitude),
                              });
                              console.log("region,", location);
                              // setLoading(false);

                              // const cI = setInterval(() => {
                              //   if (mapRef && isMapReady) {
                              //     mapRef.current.animateToRegion(
                              //       {
                              //         latitudeDelta,
                              //         longitudeDelta,
                              //         latitude: location?.latitude,
                              //         longitude: location?.longitude,
                              //       },
                              //       2000
                              //     );
                              //     clearInterval(cI);
                              //   }
                              // }, 1000);
                            },
                            (e) => {
                              showToast({
                                type: "error",
                                text: e.message,
                              });
                            },
                            {
                              enableHighAccuracy: true,
                              timeout: 20000,
                              maximumAge: 0,
                            }
                          );
                        }
                      } catch (error) {
                        setlatitude(0);
                        setlongitude(0);
                        setregion({
                          latitudeDelta: 0.015,
                          longitudeDelta: 0.0121,
                          latitude: 0,
                          longitude: 0,
                        });
                      }
                    }}
                    placeholder="Enter Location"
                  />
                </ScrollView>
                {errors?.plot_location && touched.plot_location && (
                  <Text style={styles.errorText}>{errors?.plot_location}</Text>
                )}
              </View>
              <View style={styles.padding}>
                <MapView
                  onLayout={onMapLayout}
                  loadingEnabled={true}
                  followsUserLocation={false}
                  loadingIndicatorColor={Colors.Primary}
                  // onRegionChangeComplete={(region) => {
                  //   console.log("region", region);
                  //   getLocationFromMap(region);
                  // }}
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={styles.mapComponent}
                  region={region}
                  onRegionChange={(region) => {
                    console.log("changed region", region);
                  }}
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
                >
                  {circleRadius.width !== "" && circleRadius.breadth !== "" && (
                    <Circle
                      key={(latitude + longitude).toString()}
                      center={{
                        latitude: latitude,
                        longitude: longitude,
                      }}
                      radius={
                        plotInfo.spacing
                          ? plotInfo.spacing
                          : parseFloat(circleRadius.width) *
                            parseFloat(circleRadius.breadth)
                      }
                      // radius={100}
                      strokeWidth={1}
                      strokeColor={"#89A520"}
                      fillColor={"rgba(207, 227, 134,0.5)"}
                      // onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                    />
                  )}

                  {mapCoordinates && (
                    <Marker
                      coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                      }}
                      draggable={true}
                      onDragEnd={handleDragMarkerEnd}
                      // coordinate={{
                      //   latitude: 37.78825,
                      //   longitude: -122.4324,
                      // }}
                      title={" test marker"}
                    />
                  )}
                </MapView>
              </View>
              {/* <View style={styles.inputRow}> */}
              <View style={styles.padding}>
                <Dropdown
                  value={plotInfo.plotType}
                  valueField={"title"}
                  label="Plot Type"
                  name="plot_type_id"
                  options={farmerLookUpInfo?.plot_types}
                  onSelectOption={(item: any) => {
                    console.log("selected item zone >>>>>", item);
                    setplotInfo({
                      ...plotInfo,
                      plotType: item,
                      plot_type_id: item.id,
                    });
                    setFieldValue("plot_type_id", item?.id);
                  }}
                />

                {errors?.plot_type_id && touched.plot_type_id && (
                  <Text style={styles.errorText}>{errors?.plot_type_id}</Text>
                )}

                {/* <Input
              label="Plot Type"
              value={plotInfo.plotType}
              onChangeText={(e) => {
                setplotInfo({
                  ...plotInfo,
                  plotType: e,
                });
              }}
            /> */}
                {/* </View> */}
              </View>
              <View style={styles.padding}>
                <View style={styles.inputRow}>
                  <View style={styles.row1}>
                    <Input
                      label="Productive Trees"
                      keyboardType={"numeric"}
                      name="productive_trees"
                      value={plotInfo.productive_trees.toString()}
                      onChangeText={(e: any) => {
                        if (e != 0) {
                          setplotInfo({
                            ...plotInfo,
                            productive_trees: parseFloat(e),
                          });
                          setFieldValue("productive_trees", e);
                        } else {
                          setplotInfo({
                            ...plotInfo,
                            productive_trees: 0,
                          });
                        }
                      }}
                    />
                    {/* <Input
              label="Productive Trees"
              keyboardType={"numeric"}
              value={plotInfo.productive_trees}
              onChangeText={(e: any) => {
                // if (e != 0) {
                setplotInfo({
                  ...plotInfo,
                  productive_trees: e,
                });
                // }
              }}
            /> */}
                  </View>
                  <View style={styles.row1}>
                    <Input
                      label="Non Productive Trees"
                      keyboardType={"numeric"}
                      name="non_productive_trees"
                      value={plotInfo.non_productive_trees.toString()}
                      onChangeText={(e: any) => {
                        if (e != 0) {
                          setplotInfo({
                            ...plotInfo,
                            non_productive_trees: parseFloat(e),
                          });
                          setFieldValue("non_productive_trees", e);
                        } else {
                          setplotInfo({
                            ...plotInfo,
                            non_productive_trees: 0,
                          });
                        }
                      }}
                    />
                    {/* <Input
              label="Non Productive Trees"
              keyboardType={"numeric"}
              value={plotInfo.non_productive_trees}
              onChangeText={(e: any) => {
                setplotInfo({
                  ...plotInfo,
                  non_productive_trees: e,
                });
              }}
            /> */}
                  </View>
                </View>
              </View>
              <View style={styles.padding}>
                <View style={styles.inputRow}>
                  <View style={styles.row1}>
                    <Input
                      label="Non Productive Immature"
                      keyboardType={"numeric"}
                      value={plotInfo.non_productive_immature_trees.toString()}
                      name="non_productive_immature_trees"
                      onChangeText={(e: any) => {
                        if (e != 0) {
                          setplotInfo({
                            ...plotInfo,
                            non_productive_immature_trees: parseFloat(e),
                          });

                          setFieldValue("non_productive_immature_trees", e);
                        } else {
                          setplotInfo({
                            ...plotInfo,
                            non_productive_immature_trees: 0,
                          });
                        }
                      }}
                    />
                    {/* <Input
              label="Non Productive Immature"
              keyboardType={"numeric"}
              value={plotInfo.non_productive_immature_trees}
              onChangeText={(e: any) => {
                if (e != "") {
                  setplotInfo({
                    ...plotInfo,
                    non_productive_immature_trees: e,
                  });
                }
              }}
            /> */}
                  </View>
                </View>
              </View>
              <View style={styles.padding}>
                <View style={styles.inputRow}>
                  <View style={styles.row1}>
                    <Input
                      label="Width"
                      keyboardType="numeric"
                      value={circleRadius.width}
                      onChangeText={(e: any) => {
                        if (e != "") {
                          setcircleRadius({
                            ...circleRadius,
                            width: e,
                          });
                        } else {
                          setcircleRadius({
                            ...circleRadius,
                            width: "",
                          });
                        }
                      }}
                    />
                  </View>
                  <View style={styles.row1}>
                    <Input
                      label="Breadth"
                      keyboardType="numeric"
                      value={circleRadius.breadth}
                      onChangeText={(e: any) => {
                        if (e != "") {
                          setcircleRadius({
                            ...circleRadius,
                            breadth: e,
                          });
                        } else {
                          setcircleRadius({
                            ...circleRadius,
                            breadth: "",
                          });
                        }
                        console.log("value of breadth", e);
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.btnRow}>
                <View style={styles.btn}>
                  <Button
                    // onPress={() => {
                    //   // setplotInfo({
                    //   //   ...plotInfo,
                    //   //   id: ID,
                    //   // });
                    //   // return;
                    //   // const raduis = circleRadius.width * circleRadius.breadth;

                    //   // if (plo != 0) {
                    //   //   setplotInfo({
                    //   //     ...plotInfo,
                    //   //     spacing: raduis,
                    //   //     id: ID,
                    //   //   });
                    //   // console.log("save area Raduis", { raduis });
                    //   // return;
                    //   if (!editPlotInfo) {
                    //     const ID = generateRandomNumber();
                    //     // console.log("generated ID new ", { ID });
                    //     const plotAddObj = { ...plotInfo, id: ID };
                    //     // const space =
                    //     //   parseFloat(circleRadius.width) *
                    //     //   parseFloat(circleRadius.breadth);
                    //     // setspacing(space);
                    //     // console.log("add  plot id joushwa", spacing);

                    //     // return;
                    //     // setplotInfo({...plotInfo,
                    //     // spacing:})
                    //     handleAddPlot(plotAddObj);
                    //   } else {
                    //     handleUpdatePlotInfo(plotInfo);
                    //   }
                    //   // }

                    //   // console.log("location found ", geoLocation);
                    // }}
                    onPress={handleSubmit}
                  >
                    {editPlotInfo ? "Update" : "Add"}
                  </Button>
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
