import { Dimensions, StyleSheet } from "react-native";
import { Metrix, Colors } from "../../../config";
import metrix from "../../../config/metrix";

export const styles = StyleSheet.create({
  imageContainer: {
    width: Metrix.HorizontalSize(230) * 0.5,
    height: Metrix.HorizontalSize(220) * 0.5,
    // borderColor: "black",
    // borderWidth: 1,
    // borderRadius: 10,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    marginHorizontal: 3,
  },

  mapComponent: {
    width: Metrix.HorizontalSize(378),
    height: Metrix.VerticalSize(340),
  },
  icon: {
    height: Metrix.VerticalSize(35),
    width: Metrix.VerticalSize(30),
    // color: Colors.Black,
    // marginHorizontal: Metrix.HorizontalSize(35),
    // marginTop: Metrix.VerticalSize(25),
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
    width: Metrix.HorizontalSize(200) * 0.5,
    height: Metrix.HorizontalSize(200) * 0.5,
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
  cameraIcon: {
    height: Metrix.VerticalSize(52),
    width: Metrix.VerticalSize(52),
    color: "#89A520",

    // marginHorizontal: Metrix.HorizontalSize(35),
    // marginTop: Metrix.VerticalSize(25),
  },
  cameraIconContainerMini: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    padding: 6,
    // width: 35,
    position: "absolute",
    zIndex: 99999, // top: 30,
    right: 155,
    bottom: 8,
    backgroundColor: Colors.Primary,
    width: Metrix.HorizontalSize(60) * 0.5,
    height: Metrix.HorizontalSize(60) * 0.5,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    // flexDirection: "row",
  },
  cameraIconMini: {
    height: Metrix.VerticalSize(25),
    width: Metrix.VerticalSize(20),
    // justifyContent: "center",
    // alignItems: "center",
    // marginHorizontal: Metrix.HorizontalSize(35),
    // marginTop: Metrix.VerticalSize(25),
  },
  flexContainer: {
    // flex: 1,
    flexDirection: "row",
  },
  container: {
    paddingTop: Metrix.VerticalSize(35),
    paddingBottom: Metrix.VerticalSize(100),
    paddingHorizontal: Metrix.HorizontalSize(20),
    backgroundColor: Colors.White,
    // height: Metrix.VerticalSize(100),
    // flex: 1,
  },
  imageSelection: {
    height: Metrix.VerticalSize(48),
    width: Metrix.HorizontalSize(30),
  },
  tabView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: Metrix.VerticalSize(30),
  },
  inputRow: {
    flexDirection: "row",
  },
  tab: {
    height: Metrix.VerticalSize(48),
    paddingHorizontal: Metrix.HorizontalSize(25),
    borderRadius: Metrix.VerticalSize(25),
    justifyContent: "center",
  },
  activeTabText: {
    fontWeight: "bold",
    color: Colors.Primary,
    fontSize: Metrix.FontMedium,
  },
  tabText: {
    fontSize: Metrix.FontMedium,
    color: Colors.Black,
  },
  row1: { flex: 1, marginRight: Metrix.HorizontalSize(10) },
  row2: { flex: 1 },
  padding: {
    marginBottom: Metrix.VerticalSize(40),
    // width: 10,
  },
  imageUploadContainer: {
    marginBottom: Metrix.VerticalSize(40),
    flexDirection: "row",
    justifyContent: "center",
  },
  autoCompleteTextBox: {
    marginBottom: Metrix.VerticalSize(40),
  },
  imageUploadSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ImageUploadContainer: {
    width: 160,
    marginBottom: Metrix.VerticalSize(30),
  },
  errorText: {
    fontSize: Metrix.FontSmall,
    padding: 4,
    color: "red",
  },
  ImageUploadContainerText: {
    textAlign: "center",
    padding: 8,
    color: Colors.Primary,
  },
  addPlotText: {
    color: Colors.Primary,
    fontWeight: "bold",
    textAlign: "right",
    textDecorationLine: "underline",
  },
  locationText: {
    color: Colors.Primary,
    fontWeight: "bold",
    marginBottom: Metrix.VerticalSize(20),
  },
  btnRow: {
    flexDirection: "row",
    // alignItems: "center",
    marginTop: 25,
    // justifyContent: "center",
  },
  btn: {
    width: Metrix.HorizontalSize(378),
  },
});
