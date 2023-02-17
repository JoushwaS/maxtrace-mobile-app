import { Dimensions, StyleSheet } from "react-native";
import { Metrix, Colors } from "../../../config";
import metrix from "../../../config/metrix";

export const styles = StyleSheet.create({
  imageContainer: {
    width: 150,
    height: 150,
    // borderColor: "black",
    // borderWidth: 1,
    borderRadius: 10,

    marginHorizontal: 3,
  },
  errorText: {
    fontSize: Metrix.FontExtraSmall,
    padding: 4,
    color: "red",
  },
  mapContainer: {},
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
    borderRadius: 50,
    padding: 6,
    width: 30,
    position: "absolute",
    zIndex: 99999, // top: 30,
    // left: 10,
    backgroundColor: Colors.Primary,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  cameraIcon: {
    height: Metrix.VerticalSize(25),
    width: Metrix.VerticalSize(22),

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
    marginBottom: Metrix.VerticalSize(30),
    // width: 10,
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
    // justifyContent: "center",
  },
  btn: {
    width: Metrix.HorizontalSize(378),
  },
});
