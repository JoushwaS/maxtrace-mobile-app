import {StyleSheet} from 'react-native';
import {Metrix, Colors} from '../../config';
import metrix from '../../config/metrix';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: Metrix.VerticalSize(15),
    paddingHorizontal: Metrix.HorizontalSize(25),
  },
  heading: {
    fontSize: Metrix.CustomFontSize(18),
    textAlign: 'center',
    color: 'black',
  },
  logout: {
    fontSize: Metrix.CustomFontSize(13),
  },
  input: {
    borderColor: Colors.Theme_Blue,
    borderWidth: Metrix.VerticalSize(1),
    borderRadius: Metrix.Radius,
    paddingVertical: Metrix.VerticalSize(12),
    paddingHorizontal: Metrix.HorizontalSize(15),
    marginBottom: Metrix.VerticalSize(15),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Metrix.VerticalSize(35),
  },
  addBtn: {
    width: Metrix.VerticalSize(100),
    alignSelf: 'center',
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: metrix.VerticalSize(5),
  },
  todoText: {
    fontSize: metrix.CustomFontSize(15),
    width: metrix.HorizontalSize(190),
    color: 'black',
  },
});
