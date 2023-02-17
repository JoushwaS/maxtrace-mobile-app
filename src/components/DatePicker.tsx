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
// import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Input } from ".";

import DatePicker from "react-native-date-picker";
interface IDatePickerProps {
  containerStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  placeholder?: string;
  handleSelect?: (item: any) => void;
  value?: string;
  label: string;
  name?: string;
  isPassword?: boolean;
  location?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  googleAutoComplete?: boolean;
  date?: Date;
  setDate?: Dispatch<SetStateAction<Date>>;
}

function Index({
  handleSelect,
  placeholder = "",
  value,
  label,
  name,
  location,
  isPassword,
  maxLength = 36,
  keyboardType = "default",
  googleAutoComplete,
  date = new Date(),
  setDate = () => {},
}: IDatePickerProps) {
  //   const [date, setDate] = useState(new Date());

  const styles = StyleSheet.create({
    container: {
      borderRadius: Metrix.Radius,
      height: Metrix.VerticalSize(55),
      borderColor: Colors.HeadingText,
      borderWidth: Metrix.VerticalSize(1),
      // marginBottom: Metrix.VerticalSize(30),
    },
    textStyle: {
      position: "absolute",
      fontSize: Metrix.FontRegular,
      top: Metrix.VerticalSize(-10),
      left: Metrix.HorizontalSize(12),
      backgroundColor: Colors.White,
      color: Colors.HeadingText,
      paddingHorizontal: Metrix.HorizontalSize(5),
    },

    input: {
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
    btnContainer: {
      position: "absolute",
      right: Metrix.HorizontalSize(15),
      top: Metrix.VerticalSize(15),
    },
  });
  const [openDatePicker, setopenDatePicker] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setopenDatePicker(!openDatePicker);
      }}
    >
      <View style={[styles.container]}>
        <DatePicker
          modal
          open={openDatePicker}
          date={date}
          mode="date"
          name={name}
          //   placeholder="select date"
          title="Date of Birth"
          onDateChange={(date) => {
            console.log("date changed", date);
            setDate(date);
          }}
          onConfirm={(date) => {
            setopenDatePicker(false);
            console.log("confirm date", date);
            handleSelect(date);
            setDate(date);
          }}
          onCancel={() => {
            setopenDatePicker(false);
          }}
        />

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            setopenDatePicker(!openDatePicker);
          }}
          activeOpacity={0.5}
        >
          <Image
            style={styles.icon}
            source={ICONS.calendarIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.textStyle}>{label}</Text>
        <TextInput
          onFocus={() => {
            setopenDatePicker(!openDatePicker);
          }}
          name={name}
          editable={false}
          style={styles.input}
          value={moment(date).format("YYYY-MM-DD")}
          // value={moment(date).format("")}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </View>
    </TouchableOpacity>
  );
}

export default Index;
