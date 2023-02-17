import React, { useState } from "react";
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
  StyleSheet,
  Alert,
} from "react-native";
import { Images } from "../assets/images";
import { Metrix, Colors, Fonts } from "../config";
import metrix from "../config/metrix";

interface ICustomModalProps {
  buttonStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  loaderStyle?: StyleProp<any>;
  children?: Object;
  loading?: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;
  show?: boolean;
  onPress?: () => void;
}
function Index({
  textStyle = {},
  buttonStyle = {},
  loaderStyle = {},
  children,
  loading = false,
  onPress,
  setShow,
  show = false,
}: ICustomModalProps) {
  // const [modalVisible, setModalVisible] = useState(false);

  const styles = StyleSheet.create({
    // MODAL CSS

    icon: {
      height: Metrix.VerticalSize(35),
      width: Metrix.VerticalSize(25),
      // marginHorizontal: Metrix.HorizontalSize(35),
      // marginTop: Metrix.VerticalSize(25),
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 10,
      // width: metrix.HorizontalSize(300),
      // height: metrix.VerticalSize(150),
      padding: 10,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      // borderRadius: 20,
      padding: 10,
      // elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonCloseContainer: {
      // backgroundColor: Colors.Black,
      flexDirection: "row",

      justifyContent: "flex-end",
      // padding: 10,
    },
    buttonClose: {
      fontSize: Metrix.FontExtraSmall,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });

  return (
    <>
      <Modal
        style={{ height: 300, width: 300 }}
        animationType="none"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(!show);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonCloseContainer}>
              <TouchableOpacity
                onPress={() => {
                  setShow(0);
                }}
              >
                <Image
                  style={styles.icon}
                  source={Images.closeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
}
export default Index;
