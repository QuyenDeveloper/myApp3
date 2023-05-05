import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SignUpView from './register';
const Stack = createStackNavigator();
function Login({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Sign Up');
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
                <Text style={styles.userNameLabel}>Tên tài khoản</Text>
                <View style={styles.nameInputWrap}>
                  <FontAwesome5 name="user" color="black" style={styles.icon} />
                  <TextInput
                    placeholder="Nhập tên tài khoản"
                    style={{flex: 1}}
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
                <TouchableOpacity style={styles.loginBtn}>
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
            <TouchableOpacity style={styles.signUpBtn} onPress={onPressHandler}>
              <Text style={styles.signUpBtnInner}>Tài khoản mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
export default function LoginPage() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{header: () => null}}
        />
        <Stack.Screen name="Sign Up" component={SignUpView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
