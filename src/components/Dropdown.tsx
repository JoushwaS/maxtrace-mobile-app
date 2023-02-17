import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { CustomModal } from ".";
import { Images } from "../assets/images";
import { Metrix, Colors, Fonts } from "../config";

interface IButtonProps {
  buttonStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  loaderStyle?: StyleProp<any>;
  value?: string;
  valueField?: string;
  label?: string;
  name?: string;
  editKey?: string;
  editValue?: any;
  // open?: boolean;
  // setOpen: Dispatch<SetStateAction<boolean>>;
  setValue?: Dispatch<SetStateAction<String>>;
  options?: Array<Object>;
  disabled?: boolean;
  isEdit?: boolean;
  onSelectOption?: (item: any) => void;
}

function Index({
  textStyle = {},
  buttonStyle = {},
  label = "",
  value = "",
  name = "",
  valueField = "",
  editKey,
  isEdit = false,
  editValue,
  onSelectOption = () => {},
  options,
  setValue = () => {},
  // open = false,
  // setOpen = () => {},
  disabled = false,
}: IButtonProps) {
  const styles = StyleSheet.create({
    dropDownContentContainer: {
      // flexDirection: "column",
    },
    sortOptions: {
      borderRadius: Metrix.HorizontalSize(5),
      height: Metrix.VerticalSize(200),
      backgroundColor: Colors.White,
      marginBottom: Metrix.VerticalSize(10),
    },
    item: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      width: "100%",
      // borderBottomWidth: 1,
    },
    input: {
      borderColor: Colors.HeadingText,
      borderWidth: Metrix.VerticalSize(1),
      borderRadius: Metrix.Radius,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      height: Metrix.VerticalSize(55),
      paddingHorizontal: Metrix.HorizontalSize(22),
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#efefef",
      // height: Metrix.VerticalSize(200),
      width: "100%",
      // paddingHorizontal: 10,
      // zIndex: 1,
    },
    dropdown: {
      width: "100%",
      // shadowColor: "#000000",
      // shadowRadius: 4,
      // shadowOffset: { height: 4, width: 0 },
      height: Metrix.VerticalSize(100),
      // shadowOpacity: 0.5,
    },
    dropdownEmpty: {
      width: Metrix.HorizontalSize(200),
      // shadowColor: "#000000",
      // shadowRadius: 4,
      // shadowOffset: { height: 4, width: 0 },
      justifyContent: "center",
      alignItems: "center",
      height: Metrix.VerticalSize(50),
      // shadowOpacity: 0.5,
    },
    dropdownRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Metrix.VerticalSize(5),
      paddingHorizontal: Metrix.HorizontalSize(20),
    },
    inputText: {
      fontSize: Metrix.FontRegular,
      color: Colors.Black,
    },
    placeHolderText: {
      position: "absolute",
      fontSize: Metrix.FontRegular,
      top: Metrix.VerticalSize(-10),
      left: Metrix.HorizontalSize(22),
      backgroundColor: Colors.White,
      color: Colors.HeadingText,
      paddingHorizontal: Metrix.HorizontalSize(3),
    },
    arrow: {
      width: Metrix.VerticalSize(15),
      height: Metrix.VerticalSize(15),
    },
  });
  const DropdownButton = useRef();
  const [dropdownTop, setDropdownTop] = useState(0);
  const [open, setopen] = useState(false);
  const [emptyList, setemptyList] = useState(false);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          // setValue(item?.value);
          setopen(!open);
          onSelectOption(item);
        }}
      >
        <Text style={{ color: "black", width: Metrix.HorizontalSize(170) }}>
          {item[`${valueField}`]}
        </Text>
      </TouchableOpacity>
    </View>
  );
  // console.log("dropdown isEdit>>>", isEdit);
  const renderDropdown = (
    <View style={[styles.dropdown]}>
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
  const renderEmptyListDropdown = (
    <View style={[styles.dropdownEmpty]}>
      <Text style={styles.inputText}>No Data Found !</Text>
      {/* <Image
        resizeMode="contain"
        style={styles.arrow}
        source={Images.arrowDown}
      /> */}
    </View>
  );
  function checkArrayItemValue(array: any, selectedValue: any, key: any) {
    for (let i = 0; i < array?.length; i++) {
      if (array[i][key] === selectedValue) {
        return (
          <Text>{`Selected value ${selectedValue} found in array at index ${i}`}</Text>
        );
      }
    }
    return <Text style={styles.inputText}>{value[`${valueField}`]}</Text>;
  }
  return (
    <View>
      <TouchableOpacity
        ref={DropdownButton}
        onPress={() => {
          if (options?.length) {
            setopen(true);
            console.log("clicked");
          } else {
            setemptyList(true);
          }
        }}
        activeOpacity={0.5}
      >
        <CustomModal show={open} setShow={setopen} children={renderDropdown} />
        <CustomModal
          show={emptyList}
          setShow={setemptyList}
          children={renderEmptyListDropdown}
        />
        <View style={styles.input}>
          <Text style={styles.inputText}>{value[`${valueField}`]}</Text>

          <Image
            resizeMode="contain"
            style={styles.arrow}
            source={Images.arrowDown}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.placeHolderText}>{label}</Text>
    </View>
  );
}

export default Index;
