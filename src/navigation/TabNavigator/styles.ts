import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    alignSelf: "center",
    shadowColor: "#000000",
    flexDirection: "row",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "space-around",
    alignItems: "center",
    shadowRadius: 10,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: metrix.VerticalSize(20),
    borderTopRightRadius: metrix.VerticalSize(20),
    height: metrix.VerticalSize(80),
    width: metrix.HorizontalSize(),
    elevation: 10,
  },
  icon: {
    width: metrix.VerticalSize(29),
    height: metrix.VerticalSize(29),
    resizeMode: "contain",
    tintColor: Colors.Primary,
  },
  viewCon: {
    alignItems: "center",
    justifyContent: "center",
    width: metrix.VerticalSize(38),
    height: metrix.VerticalSize(38),
  },
  Catimg: {
    resizeMode: "cover",
    width: metrix.HorizontalSize(80),
    height: metrix.VerticalSize(80),
  },
});
