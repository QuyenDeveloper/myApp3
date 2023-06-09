import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Button,
  RefreshControl,
} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import houses from '../../consts/houses';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import PORT from '../../consts/port';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');
const PostedNew = ({navigation}) => {
  const [postList, setPostList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    retrievePosts();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    retrievePosts();
    setRefreshing(false);
  };
  const retrievePosts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${PORT.BASE_URL}/api/getPostedPost`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostList(response.data);
    } catch (error) {
      console.log(error + 'here');
    }
  };

  const deletePost = async prd_id => {
    try {
      const response = await axios.get(
        `${PORT.BASE_URL}/api/deletePostedPost?prd_id=${prd_id}`,
      );
      retrievePosts();
    } catch (error) {
      console.log(error);
    }
  };
  const optionsList = [
    {title: 'Buy a Home', img: require('../../assets/house1.jpg')},
    {title: 'Rent a Home', img: require('../../assets/house2.jpg')},
  ];
  const categoryList = ['Tất cả', 'Đề xuất', 'Gần đây'];

  const BackFunctionHandeler = () => {
    navigation.goBack();
  };
  const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
      <View style={style.categoryListContainer}>
        {categoryList.map(
          (
            category,
            index, ////////////////Tab List///
          ) => (
            <Pressable
              key={index}
              onPress={() => setSelectedCategoryIndex(index)}>
              <Text
                style={[
                  style.categoryListText,
                  index == selectedCategoryIndex &&
                    style.activeCategoryListText,
                ]}>
                {category}
              </Text>
            </Pressable>
          ),
        )}
      </View>
    );
  };

  const ListOptions = () => {
    // CHo thuê or thue, chưa kahr dụng
    return (
      <View style={style.optionListsContainer}>
        {optionsList.map((option, index) => (
          <View style={style.optionsCard} key={index}>
            {/* House image */}
            <Image source={option.img} style={style.optionsCardImage} />

            {/* Option title */}
            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
              {option.title}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const Card = ({house}) => {
    ////////////////Tin đăng//////////////////////
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', house)}>
        <View style={style.card}>
          {/* House image */}
          <Image
            source={{uri: `${PORT.BASE_URL}/api/getImage/` + house.img}}
            style={style.cardImage}
          />

          <View style={{marginTop: 10}}>
            {/* //Title text */}
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.dark}}>
              {house.prd_title}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              {/* Location text */}
              <Text style={{color: COLORS.grey, fontSize: 14, marginTop: 5}}>
                {house.ward + ', ' + house.district_name}
              </Text>
            </View>
            <Text
              style={{fontWeight: 'bold', color: COLORS.green, fontSize: 16}}>
              {house.price.toLocaleString()} VND/Tháng
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginTop: 20,
            }}>
            <View
              style={{
                flex: 5,
                flexDirection: 'row',
                alignItems: 'center',
                alignItems: 'center',
                height: 40,
              }}>
              <Text>Trạng thái: </Text>
              {house.prd_status === 2 ? (
                <Text style={{fontWeight: 'bold', color: COLORS.green}}>
                  Đã duyệt
                </Text>
              ) : (
                <Text style={{fontWeight: 'bold', color: COLORS.red}}>
                  Chưa được duyệt
                </Text>
              )}
            </View>
            <Pressable
              onPress={() => deletePost(house.prd_id)}
              style={({pressed}) => [
                {backgroundColor: pressed ? COLORS.red : COLORS.green},
                style.deleteButton,
              ]}>
              <Text style={{color: COLORS.white}}>Xóa</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };

  //////////////////////////////////////////////Mainn///////////////////////////////////////////////////////
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* Customise status bar */}
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      {/* Header container */}
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
        <View>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
            Danh sách đã đăng
          </Text>
        </View>
        <Image
          style={style.profileImage}
          source={require('../../assets/avatars/1.jpg')}
        />
      </View>
      <View style={{flex: 1}}>
        {/* Input and sort button container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={style.searchInputContainer}>
            <Icon name="search" color={COLORS.green} size={25} />
            <TextInput
              placeholder="Tìm kiếm địa chỉ, quận, phường"
              placeholderTextColor={COLORS.grey}
            />
          </View>

          {/* <View style={style.sortBtn}>
            <Icon name="tune" color={COLORS.white} size={25} />
          </View> */}
        </View>

        {/* <ListCategories /> */}

        {/* Render Card */}

        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          snapToInterval={width - 20}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          data={postList}
          renderItem={({item}) => <Card house={item} />}
          flexGrow={1}
          flexShrink={1}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.green,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: '100%',
  },
  optionListsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    ///////////// khi tab list được nhân vao//////////
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingHorizontal: 40,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    marginBottom: 5,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
});

export default PostedNew;
