import Snackbar from 'react-native-snackbar';
import {Colors} from '../config/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {emailRegex} from './regex';

export const showToast = ({
  text = '',
  type = 'success',
  duration = 'short',
  action = {},
}) => {
  Snackbar.show({
    text,
    duration:
      duration === 'short' ? Snackbar.LENGTH_SHORT : Snackbar.LENGTH_LONG,
    numberOfLines: 1,
    textColor:
      type === 'success'
        ? Colors.Success_text
        : type === 'error'
        ? Colors.Error_text
        : Colors.Info_text,
    backgroundColor:
      type === 'success'
        ? Colors.Toast_success
        : type === 'error'
        ? Colors.Toast_error
        : Colors.Toast_info,
    // action: {
    //   text: action.text,
    //   textColor: action.textColor || Colors.Info_text,
    //   onPress: action.onPress,
    // },
  });
};

export const validateLink = (link: string) => {
  return emailRegex.test(link);
};

export const setItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};
export const getItem = async (key: string) => await AsyncStorage.getItem(key);
