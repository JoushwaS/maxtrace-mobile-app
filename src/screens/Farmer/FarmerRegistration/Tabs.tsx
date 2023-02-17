import React, { Dispatch, SetStateAction } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { act } from "react-test-renderer";
import { Colors } from "../../../config";
import { styles } from "./style";

interface IFarmerRegisterScreen {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

function Index({
  activeTab = 0,
  setActiveTab = () => null,
}: IFarmerRegisterScreen) {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state: any) => state.auth);
  const touchableProps: any = {
    activeOpacity: 0.5,
  };
  return (
    <View style={styles.tabView}>
      <TouchableOpacity
        onPress={() => setActiveTab(0)}
        style={[
          styles.tab,
          {
            backgroundColor:
              activeTab === 0 ? Colors.Primary_Light : Colors.HEADER_BG,
          },
        ]}
        {...touchableProps}
      >
        <Text style={activeTab === 0 ? styles.activeTabText : styles.tabText}>
          {"Farmer Profile"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveTab(1)}
        style={[
          styles.tab,
          {
            backgroundColor:
              activeTab === 1 ? Colors.Primary_Light : Colors.HEADER_BG,
          },
        ]}
        {...touchableProps}
      >
        <Text style={activeTab === 1 ? styles.activeTabText : styles.tabText}>
          {"Picture & ID Card"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Index;
