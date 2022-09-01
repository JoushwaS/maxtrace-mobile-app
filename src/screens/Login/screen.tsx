import React, {Fragment, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './style';
import {Button} from '../../components';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../utils';
import {IUserState} from '../../store/reducers/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Navigation from '../../navigation/root';

interface ILoginScreen {}

function Index(props: ILoginScreen) {
  const dispatch = useDispatch();
  const [userData, setUserdata] = useState<any>({
    email: '',
  });

  const handleChange = (text: string, type: string) => {
    setUserdata({
      ...userData,
      [type]: text,
    });
  };

  const handleSubmit = async () => {
    try {
      const data: any = await AsyncStorage.getItem('allData');
      if (data) {
        const JSONData = JSON.parse(data);
        const userFound: IUserState = JSONData[userData.email];
        if (userFound) {
          dispatch(setUserData(userFound));
        } else {
          showToast({type: 'error', text: 'Email does not exist'});
        }
      } else {
        showToast({type: 'error', text: 'Email does not exist'});
      }
    } catch (error) {
      showToast({type: 'error', text: error.message});
    }
  };

  const handleBackPress = () => {
    Navigation.goBack();
  };

  return (
    <Fragment>
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={handleBackPress}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Tell us your email...</Text>
      </View>
      <TextInput
        onChangeText={(text: string) => handleChange(text, 'email')}
        style={styles.input}
        value={userData.email}
        placeholder="Enter your email"
        maxLength={32}
      />
      <Button onPress={handleSubmit}>Proceed</Button>
    </Fragment>
  );
}

export default Index;
