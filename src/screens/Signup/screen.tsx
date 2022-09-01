import React, {Fragment, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './style';
import {Button} from '../../components';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../utils';
import {IUserState} from '../../store/reducers/auth';
import Navigator from '../../navigation/root';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ISignupScreen {}

function Index(props: ISignupScreen) {
  const dispatch = useDispatch();
  const [userData, setUserdata] = useState<any>({
    fullname: '',
    email: '',
  });

  const handleChange = (text: string, type: string) => {
    setUserdata({
      ...userData,
      [type]: text,
    });
  };

  const validateData = () => {
    const {fullname, email} = userData;
    if (fullname && email) {
      handleSubmit();
    } else {
      showToast({type: 'error', text: 'Input Validation failed'});
    }
  };

  const loginUser = async (data: any) => {
    try {
      const allData = {
        ...data,
        [userData.email]: {...userData},
      };
      await AsyncStorage.setItem('allData', JSON.stringify(allData));
      dispatch(setUserData(userData));
    } catch (error) {
      showToast({type: 'error', text: error.message});
    }
  };

  const handleSubmit = async () => {
    try {
      const data: any = await AsyncStorage.getItem('allData');
      if (data) {
        const JSONData = JSON.parse(data);
        const userFound: IUserState = JSONData[userData.email];
        console.log({userFound});
        if (userFound) {
          showToast({type: 'error', text: 'Email Already Exist'});
        } else {
          loginUser(JSONData);
        }
      } else {
        await AsyncStorage.setItem(
          'allData',
          JSON.stringify({
            [userData.email]: {...userData},
          }),
        );
        dispatch(setUserData(userData));
      }
    } catch (error) {
      showToast({type: 'error', text: error.message});
    }
  };

  const handleLogin = () => {
    Navigator.navigate('Login');
  };

  return (
    <Fragment>
      <Text style={styles.heading}>Tell us about yourself...</Text>
      <TextInput
        onChangeText={(text: string) => handleChange(text, 'fullname')}
        style={styles.input}
        value={userData.fullname}
        placeholder="Enter your name"
        maxLength={14}
      />
      <TextInput
        onChangeText={(text: string) => handleChange(text, 'email')}
        style={styles.input}
        value={userData.email}
        placeholder="Enter your email"
        maxLength={32}
      />
      <Button onPress={validateData}>Proceed</Button>
      <TouchableOpacity onPress={handleLogin} activeOpacity={0.5}>
        <Text style={styles.subHeading}>Already Registered ? Login here</Text>
      </TouchableOpacity>
    </Fragment>
  );
}

export default Index;
