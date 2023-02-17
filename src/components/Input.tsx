import React, { useState } from "react";
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
} from "react-native";
import { Images } from "../assets/images";
import { ICONS } from "../assets/icons";
import { Metrix, Colors } from "../config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DatePicker from "react-native-date-picker";

interface IInputProps {
  containerStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  handleSearch?: (text: string) => void;
  value?: string;
  name?: string;
  label?: string;
  isPassword?: boolean;
  editable?: boolean;
  isSearch?: boolean;
  data?: Array<Object>;
  location?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  googleAutoComplete?: boolean;
  datePicker?: boolean;
  openDatePicker?: boolean;
  setOpenDatePicker?: Dispatch<SetStateAction<boolean>>;
}

function Index({
  onChangeText,
  handleSearch,
  containerStyle,
  placeholder = "",
  value,
  label,
  name,
  location,
  isPassword,
  maxLength = 36,
  keyboardType = "default",
  googleAutoComplete,
  datePicker = false,
  editable = true,
  isSearch = false,
  openDatePicker = false,
  setOpenDatePicker = () => {},
}: IInputProps) {
  const [date, setDate] = useState(new Date());

  const [showPassword, setShowPassword] = useState<boolean>(true);
  let autoCompleteRef = null;
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const styles = StyleSheet.create({
    container: {
      borderRadius: Metrix.Radius,
      borderColor: editable ? Colors.HeadingText : Colors.LigthGrey,
      borderWidth: Metrix.VerticalSize(1),
      height: Metrix.VerticalSize(55),
      // marginBottom: Metrix.VerticalSize(20),
      // backgroundColor: "red",
    },
    textStyle: {
      position: "absolute",
      fontSize: Metrix.FontRegular,
      top: Metrix.VerticalSize(-10),
      left: Metrix.HorizontalSize(12),
      backgroundColor: Colors.White,
      color: editable ? Colors.HeadingText : Colors.LigthGrey,
      paddingHorizontal: Metrix.HorizontalSize(5),
    },
    input: {
      paddingVertical: Metrix.VerticalSize(12),
      paddingHorizontal: Metrix.HorizontalSize(15),
      // marginBottom: Metrix.VerticalSize(25),
      height: Metrix.VerticalSize(50),
      color: editable ? "black" : Colors.Grey,
    },
    search: {
      paddingVertical: Metrix.VerticalSize(12),
      paddingHorizontal: Metrix.HorizontalSize(15),
      marginBottom: Metrix.VerticalSize(25),
      height: Metrix.VerticalSize(50),
      color: "black",
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
    searchIcon: {
      height: Metrix.VerticalSize(22),
      width: Metrix.VerticalSize(22),
      tintColor: Colors.Primary,
    },
    btnContainer: {
      position: "absolute",
      right: Metrix.HorizontalSize(15),
      top: Metrix.VerticalSize(15),
    },
  });
  return (
    <View style={[styles.container, containerStyle]}>
      {googleAutoComplete ? (
        <>
          <GooglePlacesAutocomplete
            ref={(ref) => (autoCompleteRef = ref)}
            suppressDefaultStyles={false}
            placeholder={"Enter Location"}
            fetchDetails={true}
            keyboardShouldPersistTaps="handled"
            styles={{
              container: {
                width: "100%",
              },
              textInputContainer: {
                borderTopWidth: 0,
                // borderBottomWidth: 0,
                backgroundColor: "#fff",
                width: "100%",
              },
              textInput: {
                borderWidth: 0,
                width: "100%",

                color: "#5d5d5d",
                fontSize: 16,
                // textAlign: Platform.select({
                //   ios: isAppRTL ? "right" : "left",
                //   android: isAppRTL ? "right" : "left",
                // }),
              },
              predefinedPlacesDescription: {},
            }}
            textInputProps={{
              errorStyle: { color: "red" },
              placeholderTextColor: "grey",
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              Keyboard.dismiss();
            }}
            debounce={200}
            query={{
              key: "AIzaSyAPHkxYcFVRtwmQ0WSErVZsXhhosGI5RL8",
              language: "en",
              components: "country:ug",
              radius: "100000",
            }}
            listEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 120,
                  }}
                >
                  <Text style={{ color: "black" }}>No Results Found</Text>
                </View>
              );
            }}
            currentLocation={false}
            renderRow={(rowData) => {
              console.log({ rowData });
              const title = rowData.structured_formatting.main_text;
              const address = rowData.structured_formatting.secondary_text;
              return (
                <View>
                  <Text style={{ fontSize: 14 }}>{title}</Text>
                  <Text style={{ fontSize: 14 }}>{address}</Text>
                </View>
              );
            }}
          />
        </>
      ) : datePicker ? (
        <DatePicker
          modal
          open={openDatePicker}
          date={date}
          mode={"date"}
          onConfirm={(date) => {
            setOpenDatePicker(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />
      ) : isSearch ? (
        <TextInput
          onChangeText={onChangeText}
          style={styles.search}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          keyboardType={keyboardType}
          secureTextEntry={isPassword ? showPassword : false}
        />
      ) : (
        <>
          <TextInput
            editable={editable}
            onChangeText={onChangeText}
            style={styles.input}
            value={value}
            name={name}
            placeholder={placeholder}
            maxLength={maxLength}
            keyboardType={keyboardType}
            secureTextEntry={isPassword ? showPassword : false}
          />
        </>
      )}
      {isPassword && (
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleToggle}
          activeOpacity={0.5}
        >
          <Image
            style={styles.icon}
            source={Images.eyeBtn}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {location && (
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleToggle}
          activeOpacity={0.5}
        >
          <Image
            style={styles.icon}
            source={Images.locationIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {isSearch && (
        <TouchableOpacity
          style={styles.btnContainer}
          // onPress={handleSearch(value)}
          activeOpacity={0.5}
        >
          <Image
            style={styles.searchIcon}
            source={ICONS.searchIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {datePicker && (
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            setOpenDatePicker(!openDatePicker);
          }}
          activeOpacity={0.5}
        >
          <Image
            style={styles.icon}
            source={ICONS.calendarIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {/* {datePicker && (
        <DatePicker
          modal
          open={openDatePicker}
          date={date}
          onConfirm={(date) => {
            setOpenDatePicker(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />
      )} */}
      {label && <Text style={styles.textStyle}>{label}</Text>}
    </View>
  );
}

export default Index;
