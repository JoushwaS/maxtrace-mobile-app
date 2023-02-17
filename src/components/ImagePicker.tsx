import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  Text,
} from "react-native";
import { Metrix, Colors, Fonts } from "../config";
interface IImagePicker {
  buttonStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  loaderStyle?: StyleProp<any>;
  children: string;
  loading?: boolean;
  bgWhite?: boolean;
  disabled?: boolean;
  textBlack?: boolean;
  borderBlack?: boolean;
  onPress: () => void;
}
function Index({
  textStyle = {},
  buttonStyle = {},
  loaderStyle = {},
  children,
  loading = false,
  onPress,
  disabled = false,
  bgWhite = false,
  borderBlack = false,
  textBlack = false,
}: IImagePicker) {}
