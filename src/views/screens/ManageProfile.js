import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LoginScreen from './LoginScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PORT from '../../consts/port';
import COLORS from '../../consts/colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ManageProfile = ({navigation}) => {
  useEffect(() => {
    checkToken();
  }, []);
  const [ten, setTen] = useState('');
  const [sdt, setSdt] = useState('');
  const [matkhau, setMatkhau] = useState('');
  const [xnmatkhau, setxnMatkhau] = useState('');
  const [sessionState, setSessionState] = useState('');
  const [editState, setEditState] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const setAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
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
          setAvatarSource(require('../../assets/person.jpg'));
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
        setAvatarSource({uri: `${PORT.BASE_URL}/api/getUserAvatar/person.jpg`});
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  const checkToken = async () => {
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
          setSessionState('');
          await AsyncStorage.removeItem('token');
          // Perform any other actions needed when the token is expired or invalid
        } else {
          setSessionState(token);
        }
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleLoginSuccess = async ({token}) => {
    setSessionState(token);
    await AsyncStorage.setItem('token', token);
  };
  const handleChinhSua = async () => {
    setEditState(!editState);
  };

  const handleLogout = async () => {
    // Remove the token from AsyncStorage and reset the session state
    await AsyncStorage.removeItem('token');
    setSessionState('');
  };
  return sessionState ? (
    <ScrollView style={{backgroundColor: COLORS.white}}>
      <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
        <StatusBar
          translucent={false}
          backgroundColor={COLORS.white}
          barStyle="dark-content"
        />
        <View style={style.Header}>
          <Text style={style.HeaderText}>Quản lý tài khoản</Text>
        </View>
        <View style={style.avatarWapper}>
          <Image
            source={require('../../assets/avatars/1.jpg')}
            style={style.avatar}></Image>
        </View>

        <View>
          <View style={style.InputWrap}>
            <Text style={{color: COLORS.green}}>Cập nhật tên người dùng</Text>
            <TextInput
              style={[
                style.textInputBorder,
                editState
                  ? {borderColor: COLORS.green}
                  : {borderColor: COLORS.white},
              ]}
              placeholder="Tên hiện tại"
              placeholderTextColor={COLORS.grey}
              editable={editState}
            />
          </View>

          <View style={style.InputWrap}>
            <Text style={{color: COLORS.green}}>Cập nhật số điện thoại</Text>
            <TextInput
              style={[
                style.textInputBorder,
                editState
                  ? {borderColor: COLORS.green}
                  : {borderColor: COLORS.white},
              ]}
              placeholder="SDT hien tại"
              placeholderTextColor={COLORS.grey}
              editable={editState}
            />
          </View>

          <View style={style.InputWrap}>
            <Text style={{color: COLORS.green}}>Cập nhật mật khẩu</Text>
            <View>
              <TextInput
                style={[
                  style.textInputBorder,
                  editState
                    ? {borderColor: COLORS.green}
                    : {borderColor: COLORS.white},
                ]}
                placeholder="Pass"
                placeholderTextColor={COLORS.grey}
                editable={editState}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 10, top: 23}}
                onPress={togglePasswordVisibility}>
                <Icon
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={style.InputWrap}>
            <View>
              <Text style={{color: COLORS.green}}>Xác nhận mật khẩu</Text>
              <TextInput
                style={[
                  style.textInputBorder,
                  editState
                    ? {borderColor: COLORS.green}
                    : {borderColor: COLORS.white},
                ]}
                placeholder="Confirm pass"
                placeholderTextColor={COLORS.grey}
                editable={editState}
                secureTextEntry={!showPassword2}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 10, top: 43}}
                onPress={togglePasswordVisibility2}>
                <Icon
                  name={showPassword2 ? 'visibility-off' : 'visibility'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* btn logout */}
        <View style={style.submitBtnWrap}>
          <TouchableOpacity style={style.submitBtn} onPress={handleChinhSua}>
            <LinearGradient
              colors={['#0FA914', '#6DF755']}
              style={style.linearGradient}
              useAngle={true}
              angle={45}>
              {editState ? (
                <Text style={style.submitBtnInner}>Lưu</Text>
              ) : (
                <Text style={style.submitBtnInner}>Chỉnh sửa</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* btn logout */}
        <View style={style.submitBtnWrap}>
          <TouchableOpacity style={style.submitBtn} onPress={handleLogout}>
            <LinearGradient
              colors={['#0FA914', '#6DF755']}
              style={style.linearGradient}
              useAngle={true}
              angle={45}>
              <Text style={style.submitBtnInner}>Đăng xuất</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  ) : (
    <LoginScreen onLoginSuccess={handleLoginSuccess} />
  );
};

const style = StyleSheet.create({
  Header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderText: {
    color: COLORS.dark,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  Text: {
    color: COLORS.grey,
  },
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
  submitBtnWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  linearGradient: {
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    width: '90%',
  },
  submitBtnInner: {
    color: 'white',
    fontWeight: 'bold',
  },
  InputWrap: {
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  textInputBorder: {
    color: COLORS.grey,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
});

export default ManageProfile;
