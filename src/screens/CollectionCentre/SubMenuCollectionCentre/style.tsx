import { StyleSheet } from "react-native";
import { Metrix, Colors } from "../../../config";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(24),
    backgroundColor: Colors.White,
    flex: 1,
  },
  heading: {
    fontSize: Metrix.FontRegular,
    color: "black",
    marginBottom: Metrix.VerticalSize(23),
  },
  logout: {
    fontSize: Metrix.CustomFontSize(16),
  },
  card: {
    height: Metrix.VerticalSize(65),
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colors.Primary_Light,
    marginBottom: Metrix.VerticalSize(12),
    borderRadius: Metrix.Radius,
    // justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: Metrix.VerticalSize(35),
    width: Metrix.VerticalSize(35),
    marginHorizontal: Metrix.HorizontalSize(35),
    // marginTop: Metrix.VerticalSize(25),
  },
  cardHeading: {
    color: Colors.Primary,
    fontSize: Metrix.FontMedium,
    fontWeight: "bold",
  },

  addBtn: {
    width: Metrix.VerticalSize(100),
    alignSelf: "center",
  },
});
