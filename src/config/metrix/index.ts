import { Dimensions, PixelRatio, Platform } from "react-native";
import { isIphoneX } from "./isIPhoneX";
let { height, width } = Dimensions.get("window");

height -= Platform.OS == "ios" ? (isIphoneX() ? 70 : 20) : 24;

const DESIGN_HEIGHT: number = 1021;
const DESIGN_WIDTH: number = 428;

const scale = height / DESIGN_HEIGHT;

const VerticalSize = (size: number = DESIGN_HEIGHT) =>
  (size / DESIGN_HEIGHT) * height;
const HorizontalSize = (size: number = DESIGN_WIDTH) =>
  (size / DESIGN_WIDTH) * width;

const normalize = (size: number) => {
  const _size = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(_size));
};

export default {
  Radius: VerticalSize(5),
  LightRadius: VerticalSize(5),
  CustomFontSize: normalize,
  FontRegular: normalize(16),
  FontExtraSmall: normalize(12),
  FontSmall: normalize(14),
  FontMedium: normalize(18),
  FontLarge: normalize(20),
  VerticalSize,
  HorizontalSize,
};
