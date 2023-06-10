import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import LoginScreen from './LoginScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PORT from '../../consts/port';

const ManageProfile = ({navigation}) => {
  const [sessionState, setSessionState] = useState('');

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setSessionState(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginSuccess = async ({token}) => {
    setSessionState(token);
    await AsyncStorage.setItem('token', token);
  };

  const handleLogout = async () => {
    // Remove the token from AsyncStorage and reset the session state
    await AsyncStorage.removeItem('token');
    setSessionState('');
  };

  return sessionState ? (
    <View>
      <Text>ManageProfile</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  ) : (
    <LoginScreen onLoginSuccess={handleLoginSuccess} />
  );
};

export default ManageProfile;
