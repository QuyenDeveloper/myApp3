import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import COLORS from '../../consts/colors';
const {width} = Dimensions.get('screen');
import AsyncStorage from '@react-native-async-storage/async-storage';
import PORT from '../../consts/port';
const DetailsScreen = ({navigation, route}) => {
  useEffect(() => {}, []);
  const [luuBtnState, setLuuBtnState] = useState(true);
  const house = route.params;
  const BackFunctionHandeler = () => {
    navigation.goBack();
  };
  const checkLuuState = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(
          `${PORT.BASE_URL}/api/checkLikedPost?prd_id=${house.prd_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.length > 0) {
          setLuuBtnState(false);
        } else {
          setLuuBtnState(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const luuBtn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const response = await axios.post(
          `${PORT.BASE_URL}/api/likePost`,
          {prd_id: house.prd_id},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.success) {
          setLuuBtnState(false);
        }
      } else {
        Alert.alert('Không cho phép', 'Đăng nhập để lưu bài');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const huyLuuBtn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.post(
          `${PORT.BASE_URL}/api/removeLikePost`,
          {prd_id: house.prd_id},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.success) {
          setLuuBtnState(true);
        }
      } else {
        Alert.alert('Không cho phép', 'Đăng nhập để lưu bài');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const InteriorCard = ({interior}) => {
    return (
      <Image
        source={{
          uri: `${PORT.BASE_URL}/api/getImage/` + interior,
        }}
        style={style.interiorImage}
      />
    );
  };

  return (
    checkLuuState(),
    (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* House image */}

          <View style={style.backgroundImageContainer}>
            <ImageBackground
              style={style.backgroundImage}
              source={{
                uri: `${PORT.BASE_URL}/api/getImage/` + house.img,
              }}>
              <View style={style.header}>
                <View style={style.headerBtn}>
                  <Pressable>
                    <Icon
                      name="arrow-back-ios"
                      size={20}
                      onPress={BackFunctionHandeler}
                    />
                  </Pressable>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={style.detailsContainer}>
            {/* /////////////Title/////////// */}
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLORS.dark}}>
              {house.prd_title}
            </Text>

            {/* Location text */}
            <Text style={{fontSize: 16, color: COLORS.green, marginTop: 20}}>
              {house.ward + ', ' + house.district_name}
            </Text>
            <Text style={{fontSize: 16, color: COLORS.grey, marginTop: 20}}>
              {house.detail_address}
            </Text>
            {/* Facilities container */}
            {/* <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={style.facility}>
              <Icon name="hotel" size={18} />
              <Text style={style.facilityText}>2</Text>
            </View>
            <View style={style.facility}>
              <Icon name="bathtub" size={18} />
              <Text style={style.facilityText}>2</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>100m area</Text>
            </View>
          </View> */}
            <Text style={{marginTop: 20, color: COLORS.grey}}>
              {house.prd_detail}
            </Text>

            {/* Interior list */}
            <FlatList
              contentContainerStyle={{marginTop: 20}}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, key) => key.toString()}
              data={[house.img2, house.img3, house.img4]}
              renderItem={({item}) => <InteriorCard interior={item} />}
            />
            {/* {Thong tin nguoi dung} */}
            <View>
              <View style={style.userInfoHeaderWrap}>
                <Text style={style.userInfoHeaderInner}>
                  Thông tin người đăng
                </Text>
              </View>
              <View>
                <Text style={style.userInfo}>Tên: {house.username}</Text>
                <Text style={style.userInfo}>Email: {house.email}</Text>
                <Text style={style.userInfo}>Số điện thoại: {house.phone}</Text>
              </View>
            </View>
            {/* footer container */}
            <View style={style.footer}>
              <View>
                <Text
                  style={{
                    color: COLORS.blue,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  {house.price.toLocaleString()}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.grey,
                    fontWeight: 'bold',
                  }}>
                  VND/Tháng
                </Text>
              </View>
              <View style={style.bookNowBtn}>
                {luuBtnState ? (
                  <Pressable onPress={luuBtn}>
                    <Text style={{color: COLORS.white}}>Lưu</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={huyLuuBtn}>
                    <Text style={{color: COLORS.white}}>Hủy lưu</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

const style = StyleSheet.create({
  userInfoHeaderWrap: {
    marginTop: 15,
  },
  userInfo: {paddingVertical: 5},
  userInfoHeaderInner: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: {flex: 1, paddingHorizontal: 20, marginTop: 40},
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
});

export default DetailsScreen;
