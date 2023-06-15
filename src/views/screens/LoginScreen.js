import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PORT from '../../consts/port';

const LoginPage = ({loginStatic}) => {
  const navigation = useNavigation();
  const RegisterBtn = () => {
    navigation.navigate('RegisterScreen');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Login Failed', 'Please enter both username and password');
      return;
    }
    try {
      const response = await axios.post(`${PORT.BASE_URL}/api/login`, {
        username,
        password,
      });
      // console.log(response.data);
      if (response.data.success) {
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Store the token securely
        await AsyncStorage.setItem('token', token);
        // Call the onLoginSuccess function or navigate to the desired screen
        loginStatic(true);
      } else {
        // Display error message if login fails
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred during login' + error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.outerViewContainer}>
        <View style={styles.innerViewContainer}>
          {/* header */}
          <View style={styles.headerWrap}>
            <Text style={styles.header}>Đăng nhập</Text>
          </View>
          {/* page body */}
          <View style={styles.bodyWrap}>
            {/* top body */}
            <View style={styles.bodyTop}>
              {/* nhap ten tai khoan */}
              <View>
                <Text style={styles.userNameLabel}>Email</Text>
                <View style={styles.nameInputWrap}>
                  <FontAwesome5 name="user" color="black" style={styles.icon} />
                  <TextInput
                    placeholder="Nhập email"
                    style={{flex: 1}}
                    value={username}
                    onChangeText={text => setUsername(text)}
                  />
                </View>
              </View>

              {/* mat khau */}
              <View>
                <Text style={styles.passwordLabel}>Mật khẩu</Text>
                <View style={styles.passwordInputWrap}>
                  <FontAwesome5 name="lock" color="black" style={styles.icon} />
                  <TextInput
                    placeholder="Nhập mật khẩu"
                    style={{flex: 1}}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                  />
                </View>
              </View>

              {/* quen mat khau */}
              <View style={styles.forgotPasswordWrap}>
                <Text style={styles.forgotPassword}>Quên mật khẩu ?</Text>
              </View>
            </View>
            {/* bottom body */}
            <View style={styles.bodyBottom}>
              {/* nut dang nhap */}
              <View style={styles.loginBtnWrap}>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                  <LinearGradient
                    colors={['#0FA914', '#6DF755']}
                    style={styles.linearGradient}
                    useAngle={true}
                    angle={45}>
                    <Text style={styles.loginBtnInner}>Đăng nhập</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              {/* dang nhap bang cach khac */}
              <View style={styles.otherSignUpWrap}>
                <Text>Đăng ký bằng</Text>
                <View style={styles.otherSignUpBtnWrap}>
                  <TouchableOpacity style={styles.facebookSignUpBtn}>
                    <FontAwesome5 name="facebook-f" size={20} color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.twitterSignUpBtn}>
                    <FontAwesome5 name="twitter" size={20} color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.googleSignUpBtn}>
                    <FontAwesome5 name="google" size={20} color={'white'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* footer */}
          <View style={styles.footerWrap}>
            <Text>Hoặc đăng ký bằng</Text>
            <TouchableOpacity style={styles.signUpBtn} onPress={RegisterBtn}>
              <Text style={styles.signUpBtnInner}>Tài khoản mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  outerViewContainer: {
    flex: 1,
    backgroundColor: '#0FA915',
  },
  innerViewContainer: {
    backgroundColor: 'white',
    margin: 10,
    flex: 1,
    borderRadius: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  headerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyWrap: {
    flex: 6,
    // backgroundColor: 'green',
  },
  footerWrap: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtn: {
    padding: 20,
  },
  signUpBtnInner: {
    color: 'black',
    fontWeight: '500',
  },
  bodyTop: {margin: 30},
  bodyBottom: {
    marginVertical: 20,
  },
  nameInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingStart: 20,
    marginBottom: 20,
  },
  userNameLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  passwordLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  passwordInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingStart: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  forgotPassword: {
    color: 'black',
  },
  forgotPasswordWrap: {
    alignItems: 'flex-end',
  },
  loginBtnWrap: {
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
  loginBtn: {
    width: '90%',
  },
  loginBtnInner: {
    color: 'white',
    fontWeight: 'bold',
  },
  otherSignUpWrap: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherSignUpBtnWrap: {
    marginTop: 20,
    flexDirection: 'row',
  },
  facebookSignUpBtn: {
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor: '#3b5998',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  twitterSignUpBtn: {
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor: '#1dcaff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  googleSignUpBtn: {
    width: 40,
    height: 40,
    padding: 10,
    backgroundColor: '#EA4335',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});

export default LoginPage;
