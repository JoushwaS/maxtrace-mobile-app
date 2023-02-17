import React, { useEffect, useState } from "react";
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
import { Images } from "../assets/images";
import { ICONS } from "../assets/icons";
import { Metrix, Colors } from "../config";
import moment from "moment";
import { TruncateText } from "../utils";

interface IInfoCardProps {
  isEdit?: boolean;
  isFarmer?: boolean;

  facilityID?: string;
  farmerID?: string;
  gender?: string;
  date_of_birth?: Date;
  phone_number?: string;
  location?: { Address: string; Zone: string };
  profilePicture?: string;
  headerText?: string;
  containerStyle?: StyleProp<any>;
  item?: Object;
  imagesList?: Array<T>;
  handleEditSelect?: (item: any) => void;
}

function Index({
  isEdit = false,
  isFarmer = false,
  date_of_birth,
  facilityID,
  farmerID,
  gender,
  phone_number,
  location,
  profilePicture,
  headerText = "",
  containerStyle,
  imagesList,
  handleEditSelect,
  item,
}: IInfoCardProps) {
  const [openEditModal, setopenEditModal] = useState(false);
  const styles = StyleSheet.create({
    container: {
      // borderRadius: Metrix.Radius,
      // borderColor: Colors.HeadingText,
      // borderWidth: Metrix.VerticalSize(1),
      // flex: 1,
      height: Metrix.VerticalSize(170),

      marginBottom: Metrix.VerticalSize(30),
      // backgroundColor: Colors.LigthGrey,
    },
    editModal: {
      backgroundColor: Colors.White,
      position: "absolute",
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: Metrix.Radius,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
      height: Metrix.VerticalSize(40),
      left: 140,
      top: 25,
    },
    infoCardContainer: {
      backgroundColor: Colors.Primary_Light,
      // height: Metrix.VerticalSize(170),
      width: Metrix.HorizontalSize(375),
      // opacity: 0.1,
      padding: 10,
      borderRadius: Metrix.Radius,
      flexDirection: "row",

      // width: Metrix.HorizontalSize(200),
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
    inputRow: {
      flexDirection: "row",
    },
    row1: { flex: 1, marginRight: Metrix.HorizontalSize(10) },
    row2: { flex: 1 },
    input: {
      paddingVertical: Metrix.VerticalSize(12),
      paddingHorizontal: Metrix.HorizontalSize(15),
      marginBottom: Metrix.VerticalSize(25),
      height: Metrix.VerticalSize(50),
      color: "black",
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
    iconSm: {
      height: Metrix.VerticalSize(18),
      width: Metrix.VerticalSize(18),
      tintColor: Colors.Primary,
    },
    icon: {
      height: Metrix.VerticalSize(22),
      width: Metrix.VerticalSize(22),
      tintColor: Colors.Primary,
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
    cameraIconContainer: {
      padding: 6,
      // borderRadius: 100,
      // width: Metrix.HorizontalSize(150),
      // height: Metrix.VerticalSize(150),
      borderRadius:
        Math.round(
          Dimensions.get("window").width + Dimensions.get("window").height
        ) / 2,
      width: Metrix.HorizontalSize(150) * 0.5,
      height: Metrix.HorizontalSize(150) * 0.5,
      // position: "absolute",
      zIndex: 99999, // top: 30,
      // left: 10,

      // backgroundColor: "#89A520",
      // opacity: 0.5,
      // backgroundColor: Colors.Primary,
      // alignSelf: "flex-center",
      alignItems: "center",
      justifyContent: "center",
    },
    imageContainer: {
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      width: "30%",
    },

    contentContainer: {
      width: "70%",
      padding: 20,
      // height: Metrix.VerticalSize(00),
      // flexWrap: "wrap",
      flexDirection: "column",
    },
    padding: {
      marginBottom: Metrix.VerticalSize(12),
      // width: 10,
    },

    infoRowContainer: {
      flexDirection: "row",
    },
    infoRow: {
      marginBottom: Metrix.VerticalSize(12),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    infoRowText: {
      paddingHorizontal: 15,
      color: Colors.Black,
    },
    headingText: {
      fontSize: Metrix.FontMedium,
      color: Colors.Black,
      // fontWeight: "bold",
    },
    cameraIcon: {
      height: Metrix.VerticalSize(100),
      width: Metrix.VerticalSize(100),
      // color: "#89A520",
      // opacity: 1,
      borderRadius:
        Math.round(
          Dimensions.get("window").width + Dimensions.get("window").height
        ) / 2,
      // marginHorizontal: Metrix.HorizontalSize(35),
      // marginTop: Metrix.VerticalSize(18),
    },
  });
  const [profile_image, setprofile_image] = useState({
    uri: profilePicture ? profilePicture : "",
  });

  console.log("profile pic uri", profile_image?.uri == "");
  useEffect(() => {
    if (imagesList?.length != 0) {
      imagesList?.map((item) => {
        if (item?.image_url != null) {
          setprofile_image({ uri: item?.image_url });
        } else {
          setprofile_image({ uri: "https://via.placeholder.com/350x150" });
        }
      });
    } else if (profilePicture) {
      console.log("profile pic uri");
      setprofile_image({ uri: profilePicture });
    }
  }, [imagesList]);

  const renderEditModal = () => {
    return (
      <View style={styles.editModal}>
        <TouchableOpacity
          onPress={() => {
            handleEditSelect(item);
            setopenEditModal(!openEditModal);
          }}
        >
          <View style={[styles.infoRow, { marginTop: 7, marginLeft: 4 }]}>
            <Image source={ICONS.editIcon2} style={styles.icon} />

            <Text style={styles.infoRowText}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.infoCardContainer,
          {
            height: isFarmer
              ? Metrix.VerticalSize(190)
              : Metrix.VerticalSize(170),
          },
        ]}
      >
        {profile_image?.uri ? (
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={profile_image}
                style={styles.cameraIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={{ uri: "https://via.placeholder.com/350x150" }}
                style={styles.cameraIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
        {isFarmer ? (
          <View style={styles.contentContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.headingText}>
                {headerText + " - " + farmerID}
              </Text>
              {isEdit && (
                <TouchableOpacity
                  onPress={() => {
                    setopenEditModal(!openEditModal);
                    // console.log("open modal madarchod");
                  }}
                >
                  <Image source={ICONS.optionsIcon} style={styles.icon} />
                </TouchableOpacity>
              )}
              {openEditModal && renderEditModal()}
            </View>
            <View style={styles.infoRowContainer}>
              <View style={styles.infoRow}>
                {phone_number && (
                  <>
                    <Image source={ICONS.cellPhoneIcon} style={styles.icon} />

                    <Text style={styles.infoRowText}>{phone_number}</Text>
                  </>
                )}
              </View>
            </View>
            <View style={styles.infoRowContainer}>
              <View style={styles.infoRow}>
                {gender && (
                  <>
                    <Image source={ICONS.register1} style={styles.iconSm} />

                    <Text style={styles.infoRowText}>
                      {gender?.charAt(0).toUpperCase() + gender?.slice(1)}
                    </Text>
                  </>
                )}
              </View>
              <View style={styles.infoRow}>
                {date_of_birth && (
                  <>
                    <Image source={ICONS.dobIcon} style={styles.iconSm} />

                    <Text style={styles.infoRowText}>
                      {moment(date_of_birth).format("DD/MM/YYYY").toString()}
                    </Text>
                  </>
                )}
              </View>
            </View>
            <View style={styles.infoRowContainer}>
              <View style={styles.infoRow}>
                {location?.Address && (
                  <>
                    <Image source={ICONS.locationIcon} style={styles.icon} />

                    <Text style={styles.infoRowText}>
                      {" "}
                      {/* {location?.Address + ""} */}
                      {TruncateText(location?.Address, 55)}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.headingText}>{headerText}</Text>
              {isEdit && (
                <TouchableOpacity
                  onPress={() => {
                    setopenEditModal(!openEditModal);
                    // console.log("open modal madarchod");
                  }}
                >
                  <Image source={ICONS.optionsIcon} style={styles.icon} />
                </TouchableOpacity>
              )}
              {openEditModal && renderEditModal()}
            </View>
            <View style={styles.infoRowContainer}>
              <View style={styles.infoRow}>
                {facilityID && (
                  <>
                    <Image source={ICONS.phoneBookIcon} style={styles.icon} />

                    <Text style={styles.infoRowText}>{facilityID}</Text>
                  </>
                )}
              </View>
              <View style={styles.infoRow}>
                {phone_number && (
                  <>
                    <Image source={ICONS.cellPhoneIcon} style={styles.icon} />

                    <Text style={styles.infoRowText}>{phone_number}</Text>
                  </>
                )}
              </View>
            </View>
            <View style={styles.infoRowContainer}>
              <View style={styles.infoRow}>
                {location?.Address && (
                  <>
                    <Image source={ICONS.locationIcon} style={styles.icon} />

                    <Text style={styles.infoRowText}>
                      {" "}
                      {location?.Zone + " , " + location?.Address}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
export default Index;
