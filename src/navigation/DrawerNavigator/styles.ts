import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../config/theme";
import metrix from "../../config/metrix";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  colContainer: {
    alignItems: "center",
  },
  routeContainer: {
    // marginHorizontal: metrix.HorizontalSize(22),
    marginTop: metrix.VerticalSize(50),
    width: metrix.HorizontalSize(356),
  },
  nameText: {
    color: Colors.White,
    fontSize: metrix.CustomFontSize(24 + 2),
    marginTop: metrix.VerticalSize(20),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: metrix.VerticalSize(19),
  },
  closeIcon: {
    alignSelf: "flex-end",
    tintColor: "#414141",
  },
  modalView: {
    width: metrix.HorizontalSize(365),
    height: metrix.VerticalSize(350),
    backgroundColor: Colors.White,
    borderRadius: metrix.VerticalSize(10),
    paddingVertical: metrix.VerticalSize(25),
    paddingHorizontal: metrix.HorizontalSize(35),
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 5,
  },
  modalHeading: {
    fontSize: metrix.CustomFontSize(22 + 2),
    textAlign: "center",
    marginBottom: metrix.VerticalSize(10),
  },
  modalText: {
    fontSize: metrix.CustomFontSize(18 + 2),
    // textAlign: "center",
  },
  avatarimg: {
    // resizeMode: "contain",
    width: metrix.VerticalSize(87.6),
    marginTop: metrix.VerticalSize(20),
    borderRadius: 50,
    height: metrix.VerticalSize(87.6),
  },
  langText: {
    fontSize: metrix.CustomFontSize(18 + 2),
    color: Colors.White,
  },
  bottomText: {
    fontSize: metrix.CustomFontSize(18 + 2),
    color: Colors.White,
    marginTop: metrix.VerticalSize(20),
  },
  switch: {
    marginHorizontal: metrix.HorizontalSize(17),
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: metrix.VerticalSize(22),
  },
});

export default styles;
