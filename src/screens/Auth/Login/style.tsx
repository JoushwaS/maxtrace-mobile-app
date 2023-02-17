import { Platform, StyleSheet } from "react-native";
import { Metrix, Colors } from "../../../config";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: Metrix.VerticalSize(15),
    paddingHorizontal: Metrix.HorizontalSize(35),
    backgroundColor: Colors.White,
    justifyContent: "space-between",
    flex: 1,
  },
  heading: {
    fontSize: Metrix.FontLarge,
    textAlign: "center",
    marginVertical: Metrix.VerticalSize(45),
    color: Colors.HeadingText,
  },
  checkbox: {
    width: Metrix.VerticalSize(20),
    height: Metrix.VerticalSize(20),
    marginBottom: Metrix.VerticalSize(30),
    marginRight: Metrix.HorizontalSize(Platform.OS === "android" ? 10 : 0),
    marginLeft: Metrix.HorizontalSize(Platform.OS === "android" ? -10 : 0),
  },
  boxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  padding: {
    marginBottom: Metrix.VerticalSize(40),
    // width: 10,
  },
  helpText: {
    fontSize: Metrix.FontRegular,
    textAlign: "center",
    marginTop: Metrix.VerticalSize(48),
    color: Colors.HeadingText,
  },
  rowText: {
    fontSize: Metrix.FontRegular,
    // textAlign: "center",
    color: Colors.HeadingText,
    marginBottom: Metrix.VerticalSize(32),
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: Metrix.VerticalSize(145),
    height: Metrix.VerticalSize(145),
    marginTop: Metrix.VerticalSize(77),
    alignSelf: "center",
  },
  arrow: {
    width: Metrix.VerticalSize(15),
    height: Metrix.VerticalSize(15),
  },
  logo: {
    width: Metrix.VerticalSize(25),
    height: Metrix.VerticalSize(25),
  },
  flagRow: {
    flexDirection: "row",
    alignItems: "center",
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
    marginBottom: Metrix.VerticalSize(32),
  },
});
