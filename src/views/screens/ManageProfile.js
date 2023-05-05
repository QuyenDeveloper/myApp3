import {View, Text} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../consts/colors';
import LoginScreen from './LoginScreen';
const ManageProfile = ({navigation}) => {
  const [sessionState, setSessionState] = useState(false);
  return sessionState ? (
    <View>
      <Text>ManageProfile</Text>
    </View>
  ) : (
    <LoginScreen />
  );
};

export default ManageProfile;
