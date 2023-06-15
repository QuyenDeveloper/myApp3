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
import {Alert} from 'react-native-windows';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const path = require('path');

const ManageProfile = ({navigation, route}) => {
  const [loginState, setLoginState] = useState(
    route.params?.loginStatic || false,
  );
  useEffect(() => {
    handleLoginSuccess();
  }, [loginState]);
  useEffect(() => {
    getUserInfo();
    checkToken();
  }, []);
  const [ten, setTen] = useState('');
  const [sdt, setSdt] = useState('');
  const [matkhau, setMatkhau] = useState('');
  const [xnmatkhau, setxnMatkhau] = useState('');
  const [sessionState, setSessionState] = useState('');
  const [editState, setEditState] = useState(false);
  const [avatarSource, setAvatarSource] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [images, setImages] = useState('');
  const [avatarChange, setAvatarChange] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
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
          // console.log(response.data.success);
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
  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${PORT.BASE_URL}/api/getUserInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTen(response.data[0].username);
    setSdt(response.data[0].phone);
    setMatkhau(response.data[0].pass);
    if (response.data[0].avatar === '') {
      setAvatarSource('DefaultAvt.jpg');
    } else {
      setAvatarSource(response.data[0].avatar);
    }
  };

  const chooseImage = async () => {
    const options = {
      compressImageQuality: 0.3,
      mediaType: 'photo',
      includeBase64: true,
    };
    const result = await launchImageLibrary(options);
    if (!result.didCancel && !result.error) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setAvatarChange(true);
      setImages(selectedImages);
    }
  };
  const handleLuu = async () => {
    if (matkhau != xnmatkhau) {
      Alert.alert('Sai thông tin', 'Nhập lại xác nhận mật khẩu');
      return;
    }
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    if (avatarChange) {
      // Iterate over the images array and append each image to formData
      images.forEach((uri, index) => {
        const imageName = path.basename(uri);
        const image = {
          uri: uri,
          type: 'image/jpeg',
          name: imageName,
        };
        formData.append('image', image);
      });
    } else {
      // Append the avatarSource to formData
      formData.append('image', avatarSource);
    }
    formData.append('ten', ten);
    formData.append('sdt', sdt);
    formData.append('matkhau', matkhau);
    try {
      if (avatarChange) {
        const response = await axios.post(
          `${PORT.BASE_URL}/api/saveUserInfo`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        const response = await axios.post(
          `${PORT.BASE_URL}/api/saveUserInfo2`,
          {
            ten,
            sdt,
            matkhau,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
    setImages('');
    setxnMatkhau('');
    setEditState(!editState);
    getUserInfo();
  };
  const handleLoginSuccess = async () => {
    if (loginState) {
      const token = await AsyncStorage.getItem('token');
      setSessionState(token);
      getUserInfo();
    }
  };
  const handleChinhSua = async () => {
    setImages('');
    setAvatarChange(false);
    setxnMatkhau('');
    setEditState(!editState);
    getUserInfo();
  };

  const handleLogout = async () => {
    // Remove the token from AsyncStorage and reset the session state
    await AsyncStorage.removeItem('token');
    setSessionState('');
    setLoginState(false);
  };
  const handleHuy = () => {
    setxnMatkhau('');
    setEditState(!editState);
    getUserInfo();
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
          {editState ? (
            <TouchableOpacity onPress={chooseImage}>
              {images ? (
                images.map((uri, index) => (
                  <Image key={index} source={{uri: uri}} style={style.avatar} />
                ))
              ) : (
                <Image
                  source={{
                    uri: `${PORT.BASE_URL}/api/getUserAvatar/` + avatarSource,
                  }}
                  style={style.avatar}
                />
              )}
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: `${PORT.BASE_URL}/api/getUserAvatar/` + avatarSource,
              }}
              style={style.avatar}
            />
          )}
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
              value={ten}
              onChangeText={setTen}
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
              value={sdt}
              onChangeText={setSdt}
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
                value={matkhau}
                onChangeText={setMatkhau}
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

          {editState && (
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
                  value={xnmatkhau}
                  onChangeText={setxnMatkhau}
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
          )}
        </View>

        {/* btn logout */}
        <View style={style.submitBtnWrap}>
          {editState ? (
            <TouchableOpacity style={style.submitBtn} onPress={handleLuu}>
              <LinearGradient
                colors={['#0FA914', '#6DF755']}
                style={style.linearGradient}
                useAngle={true}
                angle={45}>
                <Text style={style.submitBtnInner}>Lưu</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={style.submitBtn} onPress={handleChinhSua}>
              <LinearGradient
                colors={['#0FA914', '#6DF755']}
                style={style.linearGradient}
                useAngle={true}
                angle={45}>
                <Text style={style.submitBtnInner}>Chỉnh sửa</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
        {editState && (
          <View style={style.submitBtnWrap}>
            <TouchableOpacity style={style.submitBtn} onPress={handleHuy}>
              <LinearGradient
                colors={['#0FA914', '#6DF755']}
                style={style.linearGradient}
                useAngle={true}
                angle={45}>
                <Text style={style.submitBtnInner}>Hủy</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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
    <LoginScreen loginStatic={setLoginState} />
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
