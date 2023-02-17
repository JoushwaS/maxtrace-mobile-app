import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  StyleProp,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardTypeOptions,
  Keyboard,
  Dimensions,
} from "react-native";
import axios from "axios";

import { Metrix, Colors } from "../config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Images } from "../assets/images";
import { ICONS } from "../assets/icons";
import { Input } from ".";
interface IGoogleAutoComplete {
  containerStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  latitude?: number;
  longitude?: number;
  addressObj?: Object;
  fromMap?: boolean;
  placeholder?: string;

  onChangeText?: (e: any) => void;
  setlatitude?: (latitude: number) => void;
  setLocation?: (
    location: any,
    locationbasic: any,
    locationDetails: any
  ) => void;
  setlongitude?: (longitude: number) => void;
  setfromMap?: (fromMap: boolean) => void;
  setaddressObj?: (addressObj: Object) => void;
  getLocations?: () => void;
  value?: string;
  label?: string;
  name?: string;
  autoCompleteRef?: Object;
  location?: boolean;
  maxLength?: number;

  googleAutoComplete?: boolean;
  setGeoLocation?: (location: Object) => void;
  geoLocation?: Object;
}

function Index({
  onChangeText,
  setlatitude,
  setlongitude,
  setfromMap,
  setaddressObj,
  getLocations,
  setLocation,
  setGeoLocation,
  placeholder = "",
  value,
  name,
  label,
  location,
  autoCompleteRef,
  maxLength = 36,

  googleAutoComplete,
  geoLocation,
}: IGoogleAutoComplete) {
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const REVERSE_GEOCODE_URL =
    "https://maps.googleapis.com/maps/api/geocode/json";
  const GOOGLE_API_KEY = "AIzaSyBwgtDTFQB5MD6foQLlDIuXnzZYZf5YvpI";
  let styles = StyleSheet.create({
    container: {
      height: Metrix.VerticalSize(100),
      borderRadius: Metrix.Radius,
      borderColor: Colors.HeadingText,
      borderWidth: Metrix.VerticalSize(1),
      //   marginBottom: Metrix.VerticalSize(30),
    },
    image: {
      height: Metrix.VerticalSize(20),
      width: Metrix.VerticalSize(20),
      marginRight: Metrix.HorizontalSize(16),
    },
    textStyle: {
      position: "absolute",
      fontSize: Metrix.FontRegular,
      top: Metrix.VerticalSize(-10),
      left: Metrix.HorizontalSize(12),
      backgroundColor: Colors.White,
      color: Colors.HeadingText,
      //   paddingHorizontal: Metrix.HorizontalSize(5),
    },
    input: {
      paddingVertical: Metrix.VerticalSize(12),
      paddingHorizontal: Metrix.HorizontalSize(15),
      marginBottom: Metrix.VerticalSize(25),
      height: Metrix.VerticalSize(50),
    },

    googleAutoComplete: {
      marginBottom: Metrix.VerticalSize(25),
      height: Metrix.VerticalSize(50),
      container: { backgroundColor: "transparent" },

      textInput: {
        color: "black",
      },
    },
    icon: {
      height: Metrix.VerticalSize(20),
      width: Metrix.VerticalSize(20),
    },
    btnContainer: {
      position: "absolute",
      right: Metrix.HorizontalSize(15),
      top: Metrix.VerticalSize(15),
    },
  });
  const GOOGLE_API_KEY_B2C = "AIzaSyBwgtDTFQB5MD6foQLlDIuXnzZYZf5YvpI";
  const GOOGLE_API_KEY_SHIFTER = "AIzaSyDfeIyvam_5i_qWqeMMkqWeaxr4yWqXBGs&v=3";
  const GOOGLE_MAPS_API_MAXTRACE = "AIzaSyAPHkxYcFVRtwmQ0WSErVZsXhhosGI5RL8";

  useEffect(() => {
    autoCompleteRef?.current?.setAddressText("");
  }, []);

  return (
    <View style={{ marginTop: 4 }}>
      <GooglePlacesAutocomplete
        editable={true}
        name={name}
        keepResultsAfterBlur={true}
        keyboardShouldPersistTaps="handled"
        ref={autoCompleteRef}
        suppressDefaultStyles={false}
        placeholder={placeholder}
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3",
        ]}
        debounce={200}
        listUnderlayColor={"transparent"}
        listViewDisplayed={"auto"}
        renderDescription={(row) => row.description}
        styles={{
          container: {
            // width: "100%",

            flex: 1,
          },
          textInputContainer: {
            flexDirection: "row",

            borderRadius: Metrix.Radius,
            borderColor: Colors.HeadingText,
            borderWidth: Metrix.VerticalSize(1),
            backgroundColor: "#fff",

            width: "100%",
          },
          poweredContainer: {
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: "#c8c7cc",
            borderTopWidth: 0.5,
          },
          textInput: {
            backgroundColor: "#FFFFFF",

            padding: 0,
            height: 44,

            fontSize: 15,
            flex: 1,

            color: "black",
          },
          row: {
            backgroundColor: "#FFFFFF",
            padding: 13,
            height: 55,
            flexDirection: "row",
          },
          separator: {
            height: 0.5,
            backgroundColor: "#c8c7cc",
          },
          loader: {
            flexDirection: "row",
            justifyContent: "flex-end",
            height: 20,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        textInputProps={{
          // onChange: onChangeText,
          // InputComp: <Input />,
          errorStyle: { color: "red" },
          placeholderTextColor: "grey",
        }}
        renderRightButton={() => {
          return (
            <TouchableOpacity
              //   activeOpacity={0.5}
              onPress={getLocations}
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <Image source={ICONS.locationPicker} style={styles.image} />
            </TouchableOpacity>
          );
        }}
        // onPress={(data, details = null) => {
        //   console.log("Details>>>", details?.geometry);
        //   const lat = parseFloat(details?.geometry.location.lat);
        //   const lng = parseFloat(details?.geometry.location.lng);
        //   const northeastLat = parseFloat(
        //     details?.geometry.viewport.northeast.lat
        //   );
        //   const southwestLat = parseFloat(
        //     details?.geometry.viewport.southwest.lat
        //   );
        //   const latDelta = northeastLat - southwestLat;
        //   const lngDelta = latDelta * ASPECT_RATIO;

        //   // 'details' is provided when fetchDetails = true
        //   console.log("DATA", data);
        //   console.log("GEOLOCATION", details?.geometry);
        //   setGeoLocation({
        //     lng: lng,
        //     lat: lat,
        //     latDelta: latDelta,
        //     lngDelta: lngDelta,
        //   });
        // }}
        onPress={(data, details) => {
          setLocation(details?.geometry.location, data, details);
          Keyboard.dismiss();
        }}
        query={{
          key: GOOGLE_API_KEY_B2C,
          language: "en",
          components: "country:ug",

          region: "UG",
        }}
        currentLocation={false}
        renderRow={(rowData) => {
          const title = rowData.structured_formatting.main_text;
          const address = rowData.structured_formatting.secondary_text;
          return (
            <View>
              <Text style={{ fontSize: 14, color: "black" }}>{title}</Text>
              <Text style={{ fontSize: 14, color: "grey" }}>{address}</Text>
            </View>
          );
        }}
      />

      <Text style={styles.textStyle}>{label}</Text>
    </View>
  );
}

export default Index;
