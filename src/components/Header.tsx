import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  I18nManager,
} from "react-native";
import { Images } from "../assets/images";
import { Metrix, Colors } from "../config";
import Navigation from "../navigation/root";
import { useTranslation } from "react-i18next";
import { ICONS } from "../assets/icons";

interface IHeaderProps {
  containerStyle?: Object;
  text?: String;

  showSearch?: Boolean;
  onRightPress?: Function;
  backButton?: Boolean;

  backText?: Boolean;

  back?: Boolean;
}

export const Index: React.FC<IHeaderProps> = ({
  containerStyle,

  text,

  showSearch,
  onRightPress,
  backButton,

  backText,

  back,
}: IHeaderProps) => {
  const touchableProps = {
    activeOpacity: 0.5,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };
  const handleLeftPress = () => {
    if (backButton) {
      Navigation.goBack();
    } else {
      Navigation.toggleDrawer();
    }
  };
  const handleNotificationPress = () => {
    // Navigation.navigate(SCREENS.NOTIFICATION_SCREEN);
  };
  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      {!back ? (
        <TouchableOpacity
          {...touchableProps}
          style={styles.leftIcon}
          onPress={handleLeftPress}
        >
          <Image
            style={
              backButton
                ? [
                    styles.backIcon,
                    {
                      transform: I18nManager.isRTL
                        ? [{ rotate: "180deg" }]
                        : [{ rotate: "0deg" }],
                    },
                  ]
                : styles.menuIcon
            }
            resizeMode="contain"
            source={backButton ? ICONS.backIcon : ICONS.menuIcon}
          />
          {backText && <Text style={styles.backText}>{"Go back"}</Text>}
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerText}>{text}</Text>
      <View style={styles.rightRow}>
        {/* {showSearch && (
        
        )} */}
        {/* <Text style={styles.headerText}>{"hello"}</Text> */}
        <TouchableOpacity
          {...touchableProps}
          style={{
            ...styles.rightIcon,
          }}
          onPress={handleNotificationPress}
        >
          <Image
            style={styles.menuIcon}
            resizeMode="contain"
            source={ICONS.notificationIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(80),
    backgroundColor: Colors.HEADER_BG,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: Metrix.HorizontalSize(20),
    // paddingVertical: Metrix.VerticalSize(2),
  },
  rightRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: Metrix.VerticalSize(80),
    width: Metrix.HorizontalSize(120),
  },
  backIcon: {
    height: Metrix.HorizontalSize(16),
    width: Metrix.HorizontalSize(16),
    // tintColor: Colors.White,
    // color: Colors.Success_text,
  },
  menuIcon: {
    height: Metrix.HorizontalSize(22),
    width: Metrix.HorizontalSize(22),
  },
  headerText: {
    fontSize: Metrix.CustomFontSize(23),
    // fontFamily: Fonts.IR,
    color: Colors.Black,
    marginRight: Metrix.HorizontalSize(15),
  },
  backText: {
    fontSize: Metrix.CustomFontSize(20 + 2),
    // fontFamily: Fonts.IS,
    marginLeft: Metrix.HorizontalSize(15),
  },
  rightIcon: {
    // position: 'absolute',
    // right: 0,
    // zIndex: 250,
  },
  leftIcon: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: Metrix.VerticalSize(70),
    height: Metrix.VerticalSize(70),
  },
  text: {
    fontSize: Metrix.FontLarge,
    // color: Colors.Success_text,
  },
});
export default Index;
