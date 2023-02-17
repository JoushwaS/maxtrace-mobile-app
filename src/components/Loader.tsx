import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Metrix, Colors, Fonts } from "../config";
interface ILoaderProps {
  show?: boolean;

  setShow?: Dispatch<SetStateAction<String>>;
}

function Index({ show, setShow = () => {} }: ILoaderProps) {
  const styles = StyleSheet.create({
    loading: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View>
      {show && (
        <View style={styles.loading}>
          <Text>Loading...</Text>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}
export default Index;
