import { StyleSheet } from "react-native";
import { Metrix, Colors } from "../../../config";

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
  plotList: {
    flexDirection: "column",
  },
  plotListItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: Colors.Cloudly_blue,
    border: Colors.Cloudly_blue,
    borderBottomWidth: 0.5,
    // borderRadius: 10,
  },
  plotItemText: {
    color: "black",
  },
  plotItemActionContainer: {
    flexDirection: "row",
    width: 40,
    justifyContent: "space-between",
  },
  icon: {
    height: Metrix.VerticalSize(25),
    width: Metrix.VerticalSize(25),
    padding: 8,
    // color: Colors.Black,
    // marginHorizontal: Metrix.HorizontalSize(35),
    // marginTop: Metrix.VerticalSize(25),
  },
  cameraIconContainer: {
    borderRadius: 50,
    padding: 6,
    width: 35,
    position: "absolute",
    zIndex: 99999, // top: 30,
    // left: 10,
    backgroundColor: Colors.Primary,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  cameraIcon: {
    height: Metrix.VerticalSize(25),
    width: Metrix.VerticalSize(20),
    marginLeft: Metrix.HorizontalSize(2),
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
  row1: { marginBottom: 10, flex: 1, marginRight: Metrix.HorizontalSize(10) },
  row2: { flex: 1 },
  padding: {
    marginBottom: Metrix.VerticalSize(25),
  },
  imageUploadSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: Metrix.VerticalSize(240),
  },
  dropdown: {
    borderColor: Colors.HeadingText,
    borderWidth: Metrix.VerticalSize(1),
    maxHeight: Metrix.VerticalSize(160),
    borderRadius: Metrix.Radius,
  },
  dropdownRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Metrix.VerticalSize(5),
    paddingHorizontal: Metrix.HorizontalSize(20),
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
  regionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationHeading: {
    color: Colors.Primary,
    fontWeight: "bold",
    marginBottom: Metrix.VerticalSize(20),
  },
  locationText: {
    color: Colors.Black,
    // fontWeight: "bold",
    marginBottom: Metrix.VerticalSize(20),
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btn: {
    width: Metrix.HorizontalSize(160),
  },
});
