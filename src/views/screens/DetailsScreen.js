import React from 'react';
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
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import houses from '../../consts/houses';
import COLORS from '../../consts/colors';
const {width} = Dimensions.get('screen');
import {StackActions} from '@react-navigation/native';
const DetailsScreen = ({navigation, route}) => {
  const house = route.params;
  const BackFunctionHandeler = () => {
    navigation.goBack();
  };
  const InteriorCard = ({interior}) => {
    return <Image source={interior} style={style.interiorImage} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}

        <View style={style.backgroundImageContainer}>
          <ImageBackground style={style.backgroundImage} source={house.image}>
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
              <View style={style.headerBtn}>
                <Pressable>
                  <Icon name="favorite" size={20} color={COLORS.red} />
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={style.detailsContainer}>
          {/* /////////////Title/////////// */}
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.dark}}>
            {house.title}
          </Text>

          {/* Location text */}
          <Text style={{fontSize: 16, color: COLORS.grey, marginTop: 20}}>
            {house.location}
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
            {house.details}
          </Text>

          {/* Interior list */}
          <FlatList
            contentContainerStyle={{marginTop: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={house.interiors}
            renderItem={({item}) => <InteriorCard interior={item} />}
          />

          {/* footer container */}
          <View style={style.footer}>
            <View>
              <Text
                style={{color: COLORS.blue, fontWeight: 'bold', fontSize: 18}}>
                $1,500
              </Text>
              <Text
                style={{fontSize: 12, color: COLORS.grey, fontWeight: 'bold'}}>
                Total Price
              </Text>
            </View>
            <View style={style.bookNowBtn}>
              <Text style={{color: COLORS.white}}>Book Now</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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