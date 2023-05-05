import React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions
} from 'react-native';
import COLORS from '../../consts/colors';



const {width} = Dimensions.get('screen');
const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />
      <Image
        source={require('../../assets/OnBoard.png')}
        style={style.image}
      />

      

      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View>
          <Text style={style.title}>Tìm kiếm</Text>
          <Text style={style.title1}>Ngôi nhà thứ hai</Text>
          <Text style={style.title2}>Dành cho bạn</Text>
        </View>

       
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
        }}>
    
        <Pressable onPress={() => navigation.navigate('HomeScreen')}>
          <View style={style.btn}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Bắt đầu</Text>
          </View>
        </Pressable>
      </View>
      
       {/* Text container */}
        <View style={{margin: 10}}>
          <Text style={style.textStyle}>
            Copyright @ DaNang2ndHome
          </Text>
        </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: 520,
    width: '100%',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 50
  },
  indicatorContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // indicator: {
  //   height: 3,
  //   width: 30,
  //   backgroundColor: COLORS.grey,
  //   borderRadius: 5,
  //   marginHorizontal: 5,
  // },
  // indicatorActive: {
  //   backgroundColor: COLORS.dark,
  // },
  btn: {
    height: 50,
    marginHorizontal: 20,
    backgroundColor: COLORS.green,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 32, fontWeight: 'bold',color: COLORS.green},
  title1: {fontSize: 26, fontWeight: 'bold',color: COLORS.dark},
  title2: {fontSize: 26, fontWeight: 'bold',color: COLORS.dark},
  textStyle: {fontSize: 16, color: COLORS.dark, fontStyle: 'italic', textAlign: 'center'},
});
export default OnBoardScreen;
