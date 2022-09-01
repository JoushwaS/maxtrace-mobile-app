import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './style';
import Screen from './screen';

interface ILoginContiner {}

function Index(props: ILoginContiner) {
  const [userData, setUserData] = useState<any>({});

  return (
    <View style={styles.container}>
      <Screen />
    </View>
  );
}

export default Index;
