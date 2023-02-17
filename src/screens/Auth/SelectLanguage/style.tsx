import { StyleSheet } from "react-native";
import { Metrix, Colors } from "../../../config";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: Metrix.VerticalSize(15),
    paddingHorizontal: Metrix.HorizontalSize(35),
    backgroundColor: Colors.White,
    flex: 1,
  },
  heading: {
    fontSize: Metrix.FontLarge,
    textAlign: "center",
    marginVertical: Metrix.VerticalSize(45),
    color: Colors.HeadingText,
  },
  inputText: {
    fontSize: Metrix.FontRegular,
    marginHorizontal: Metrix.HorizontalSize(10),
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
    width: Metrix.VerticalSize(30),
    height: Metrix.VerticalSize(30),
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
});
