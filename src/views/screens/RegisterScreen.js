import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import COLORS from '../../consts/colors';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PORT from '../../consts/port';
import {Alert} from 'react-native-windows';
export default function RegisterView({navigation}) {
  const [email, setEmail] = useState('');
  const [ten, setTen] = useState('');
  const [matkhau, setMatkhau] = useState('');
  const [xnmatkhau, setxnMatkhau] = useState('');

  const handleDangKy = async () => {
    if (matkhau === xnmatkhau) {
      try {
        // const response = await axios.post(`${PORT.BASE_URL}/api/register`, {
        //   email,
        //   ten,
        //   matkhau,
        // });
        try {
          const response = await axios.post(`${PORT.BASE_URL}/api/login`, {
            username: email,
            password: matkhau,
          });
          if (response.data.success) {
            const token = response.data.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Store the token securely
            await AsyncStorage.setItem('token', token);
            navigation.navigate('Thông tin cá nhân', {loginStatic: true});
          } else {
            // Display error message if login fails
            Alert.alert('Login Failed', 'Invalid username or password');
          }
        } catch (error) {
          console.log(error);
          Alert.alert(
            'Error',
            'An error occurred during login' + error.message,
          );
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    } else {
      Alert.alert('Sai thông tin', 'Nhập lại mật khẩu');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.outerViewContainer}>
        <View style={styles.innerViewContainer}>
          {/* header */}
          <View style={styles.headerWrap}>
            <Text style={styles.header}>Đăng ký</Text>
          </View>
          {/* page body */}
          <View style={styles.bodyWrap}>
            {/* top body */}
            <View style={styles.bodyTop}>
              {/* ten tai khoan */}
              <View>
                <Text style={styles.userNameLabel}>Email</Text>
                <View style={styles.nameInputWrap}>
                  <FontAwesome5 name="user" color="black" style={styles.icon} />
                  <TextInput
                    placeholder="Nhập email"
                    style={{flex: 1}}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.userNameLabel}>Tên</Text>
                <View style={styles.nameInputWrap}>
                  <FontAwesome5 name="user" color="black" style={styles.icon} />
                  <TextInput
                    placeholder="Nhập tên"
                    style={{flex: 1}}
                    onChangeText={setTen}
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
                    secureTextEntry
                    style={{flex: 1}}
                    onChangeText={setMatkhau}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.passwordLabel}>Xác nhận mật khẩu</Text>
                <View style={styles.passwordInputWrap}>
                  <FontAwesome5 name="lock" color="black" style={styles.icon} />
                  <TextInput
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry
                    style={{flex: 1}}
                    onChangeText={setxnMatkhau}
                  />
                </View>
              </View>
              <View style={styles.forgotPasswordWrap}>
                <Text style={styles.forgotPassword}>Đăng nhập</Text>
              </View>
            </View>
            {/* bottom body */}
            <View style={styles.bodyBottom}>
              {/* nut dang nhap */}
              <View style={styles.loginBtnWrap}>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={handleDangKy}>
                  <LinearGradient
                    colors={['#0FA914', '#6DF755']}
                    style={styles.linearGradient}
                    useAngle={true}
                    angle={45}>
                    <Text style={styles.loginBtnInner}>Đăng ký</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              {/* dang nhap bang cach khac */}
              <View style={styles.otherSignUpWrap}>
                <Text>Hoặc đăng ký bằng</Text>
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
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  outerViewContainer: {
    flex: 1,
    backgroundColor: COLORS.green,
  },
  innerViewContainer: {
    backgroundColor: COLORS.white,
    margin: 10,
    borderRadius: 10,
    flex: 1,
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
