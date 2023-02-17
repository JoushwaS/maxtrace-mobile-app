import { StyleSheet } from "react-native";
import { Metrix, Colors } from "../../config";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(24),
    backgroundColor: Colors.White,
    flex: 1,
  },
  heading: {
    fontSize: Metrix.CustomFontSize(18),
    textAlign: "center",
    color: "black",
  },
  logout: {
    fontSize: Metrix.CustomFontSize(16),
  },
  card: {
    height: Metrix.VerticalSize(230),
    width: Metrix.HorizontalSize(180),
    backgroundColor: Colors.Primary_Light,
    marginTop: Metrix.VerticalSize(19),
    marginBottom: Metrix.VerticalSize(26),
    marginRight: Metrix.VerticalSize(20),
    borderRadius: Metrix.Radius,
    borderBottomColor: Colors.Primary,
    borderBottomWidth: Metrix.VerticalSize(4),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Metrix.HorizontalSize(15),
    paddingBottom: Metrix.VerticalSize(10),
  },
  icon: {
    height: Metrix.VerticalSize(55),
    width: Metrix.VerticalSize(55),
    marginTop: Metrix.VerticalSize(25),
  },
  cardHeading: {
    color: Colors.Primary,
    fontSize: Metrix.FontMedium,
    marginTop: Metrix.VerticalSize(18),
    marginBottom: Metrix.VerticalSize(10),
  },
  cardDescription: {
    color: Colors.HeadingText,
    fontSize: Metrix.FontRegular,
    textAlign: "center",
  },
  headerRow: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  addBtn: {
    width: Metrix.VerticalSize(100),
    alignSelf: "center",
  },
});
