import React from 'react';
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
} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import houses from '../../consts/houses';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const {width} = Dimensions.get('screen');
const HomeScreen = ({navigation}) => {
  const optionsList = [ 
    {title: 'Buy a Home', img: require('../../assets/house1.jpg')},
    {title: 'Rent a Home', img: require('../../assets/house2.jpg')},
  ];
  const categoryList = ['Tất cả', 'Đề xuất', 'Gần đây'];

    const ListCategories = () => {  // List tab  ['Tất cả', 'Đề xuất', 'Gần đây'] ///////////////////
      const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
      return (
        <View style={style.categoryListContainer}>
          {categoryList.map((category, index) => ( ////////////////Tab List///
            <Pressable
              key={index}
              onPress={() => setSelectedCategoryIndex(index)}>
              <Text
                style={[
                  style.categoryListText,
                  index == selectedCategoryIndex && style.activeCategoryListText,
                ]}>
                {category}
              </Text>
            </Pressable>
          ))}
        </View>
      );
    };

  const ListOptions = () => { // CHo thuê or thue, chưa kahr dụng
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
  
  
  const Card = ({house}) => {  ////////////////Tin đăng//////////////////////
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', house)}>
        <View style={style.card}>
          {/* House image */}
          <Image source={house.image} style={style.cardImage} />

          <View style={{marginTop: 10}}>
             {/* //Title text */}
              <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.dark}}>
                {house.title}
              </Text>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
             
             {/* Location text */}
             <Text style={{color: COLORS.grey, fontSize: 14, marginTop: 5}}>
                {house.location}
              </Text>

              <Text
                style={{fontWeight: 'bold', color: COLORS.green, fontSize: 16}}>
                {house.price} tr/Tháng
              </Text>         
            </View>
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
        <View>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
            Canada
          </Text>
        </View>
        <Image
          style={style.profileImage}
          source={require('../../assets/avatars/1.jpg')}
        />
      </View>
      <View style={{ flex: 1 }}>
        {/* Input and sort button container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={style.searchInputContainer}>
            <Icon name="search" color={COLORS.green} size={25} />
            <TextInput placeholder="Search address, city, location" placeholderTextColor={COLORS.grey} />
          </View>

          <View style={style.sortBtn}>
            <Icon name="tune" color={COLORS.white} size={25} />
          </View>
        </View>

        <ListCategories />

        {/* Render Card */}
       
        <FlatList
          snapToInterval={width - 20}
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          data={houses}
          renderItem={({item}) => <Card house={item} />}
          flexGrow={1}
          flexShrink={1}
        />
        
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
  activeCategoryListText: { ///////////// khi tab list được nhân vao//////////
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
    height: 230,
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
export default HomeScreen;
