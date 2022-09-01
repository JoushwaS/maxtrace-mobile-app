import {StyleSheet} from 'react-native';
import {Metrix, Colors} from '../../config';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: Metrix.VerticalSize(15),
    paddingHorizontal: Metrix.HorizontalSize(35),
  },
  heading: {
    fontSize: Metrix.CustomFontSize(18),
    // textAlign: 'center',
    marginVertical: Metrix.VerticalSize(25),
  },
  back: {
    fontSize: Metrix.CustomFontSize(14),
  },
  input: {
    borderColor: Colors.Theme_Blue,
    borderWidth: Metrix.VerticalSize(1),
    borderRadius: Metrix.Radius,
    paddingVertical: Metrix.VerticalSize(12),
    paddingHorizontal: Metrix.HorizontalSize(15),
    marginBottom: Metrix.VerticalSize(25),
  },
});
