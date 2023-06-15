import {StyleSheet, View, Text, ImageBackground, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import COLORS from '../consts/colors';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PORT from '../consts/port';

const CustomDrawed = props => {
  useEffect(() => {
    setAvatar();
  }, [avatarSource]);
  const [avatarSource, setAvatarSource] = useState(null);
  const setAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(
          `${PORT.BASE_URL}/api/checkTokenExpiredTime`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.data.success) {
          console.log(response.data.success);
          await AsyncStorage.removeItem('token');
          setAvatarSource({
            uri: `${PORT.BASE_URL}/api/getUserAvatar/DefaultAvt.jpg`,
          });
        } else {
          const response2 = await axios.get(
            `${PORT.BASE_URL}/api/getUserAvartarName`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setAvatarSource({
            uri:
              `${PORT.BASE_URL}/api/getUserAvatar/` + response2.data[0].avatar,
          });
        }
      } else {
        console.log('Token not found in AsyncStorage');
        setAvatarSource({
          uri: `${PORT.BASE_URL}/api/getUserAvatar/DefaultAvt.jpg`,
        });
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: COLORS.light}}>
        <ImageBackground
          source={require('../assets/menu-bg.jpg')}
          style={{paddingVertical: 30}}>
          <View style={style.avatarWapper}>
            {avatarSource && (
              <Image source={avatarSource} style={style.avatar} />
            )}
          </View>
        </ImageBackground>
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  avatarWapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
});
export default CustomDrawed;
