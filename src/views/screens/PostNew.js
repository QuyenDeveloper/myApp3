import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {SelectList} from 'react-native-dropdown-select-list';
import ImagePicker from 'react-native-image-crop-picker';
import {ScrollView} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PORT from '../../consts/port';
const {width, height} = Dimensions.get('window');
const PostNew = ({navigation}) => {
  const [sessionState, setSessionState] = useState('');
  const [tieudeInputed, setTieudeInputed] = useState('');
  const [diaChiChiTietInputed, setDiaChiTietInputed] = useState('');
  const [dienTichInputed, setDienTichInputed] = useState('');
  const [giaChoThueInputed, setGiaChoThueInputed] = useState('');
  const [moTaInputed, setmoTaInputed] = useState('');
  const [quanSelected, setQuanSelected] = useState('');
  const [huyenSelected, setHuyenSelected] = useState('');
  const [images, setImages] = useState([]);
  const [quanData, setQuanData] = useState([]);
  const [huyenData, setHuyenData] = useState([]);
  const [filteredHuyenData, setfilteredHuyenData] = useState([]);
  useEffect(() => {
    fetchQuanData();
    fetchHuyenData();
    checkToken();
  }, []);
  const fetchQuanData = async () => {
    try {
      const response = await axios.get(`${PORT.BASE_URL}/api/getQuan`);
      const formattedData = response.data.map(item => ({
        key: item.district_id.toString(),
        value: item.district_name,
      }));
      setQuanData(formattedData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  const fetchHuyenData = async () => {
    try {
      const response = await axios.post(`${PORT.BASE_URL}/api/getHuyen`);
      const formattedData = response.data.map(item => ({
        key: item.ward_id.toString(),
        value: item.ward,
        district_id: item.district_id,
      }));
      setHuyenData(formattedData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  const filterHuyenData = async () => {
    try {
      const filteredArray = huyenData.filter(
        item => item.district_id === parseInt(quanSelected),
      );
      setfilteredHuyenData(filteredArray);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setSessionState(token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadImage = async () => {
    const formData = new FormData();
    images.map((image, index) => {
      const filename = path.basename({uri: image.path});
      formData.append('images[]', {
        name: new Date() + filename,
        uri: image.path,
        type: 'image/jpg',
      });
    });
    const res = await axios.post(
      `${PORT.BASE_URL}/api/uploadImages`,
      formData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  };
  const handleSubmit = async () => {
    try {
      const imagesUri = images.map(image => ({
        uri: image.path,
      }));
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${PORT.BASE_URL}/api/upload`, {
        token,
        tieudeInputed,
        quanSelected,
        huyenSelected,
        diaChiChiTietInputed,
        dienTichInputed,
        giaChoThueInputed,
        moTaInputed,
        imagesUri,
      });

      if (response.data.success) {
        uploadImage();
        console.log('Data uploaded successfully');
      } else {
        // Data upload failed
        console.log('Data upload failed');
      }
    } catch (error) {
      // Error occurred during the request
      console.log('Error uploading data:', error);
    }
  };

  const chooseImage = async () => {
    const options = {
      multiple: true,
      compressImageQuality: 0.3,
      maxFiles: 4,
      mediaType: 'photo',
      includeBase64: true,
    };
    ImagePicker.openPicker(options).then(res => {
      const selectedImages = res.slice(0, 4).map(image => ({
        uri: image.path,
      }));
      setImages(selectedImages);
      console.log(selectedImages);
    });
  };
  const BackFunctionHandeler = () => {
    navigation.goBack();
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}>
      <ScrollView style={{backgroundColor: COLORS.white}}>
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
          {/* Customise status bar */}
          <StatusBar
            translucent={false}
            backgroundColor={COLORS.white}
            barStyle="dark-content"
          />
          {/* Header container */}
          <View style={styles.header}>
            <View style={styles.headerBtn}>
              <Pressable>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={BackFunctionHandeler}
                />
              </Pressable>
            </View>
            <View>
              <Text
                style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
                Đăng tin
              </Text>
            </View>
            <Image
              style={styles.profileImage}
              source={require('../../assets/avatars/1.jpg')}
            />
          </View>

          <View style={{paddingLeft: 25, paddingRight: 25}}>
            <View>
              <Text>Tiêu đề</Text>
              <TextInput
                placeholder="Tiêu đề"
                style={styles.textInputBorder}
                value={tieudeInputed}
                onChangeText={setTieudeInputed}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  Quận
                </Text>
                <SelectList
                  data={quanData}
                  setSelected={setQuanSelected}
                  boxStyles={{
                    width: 150,
                    borderColor: COLORS.green,
                    marginTop: 10,
                    marginBottom: 10,
                    borderWidth: 2,
                  }}
                  onSelect={() => filterHuyenData()}
                  placeholder="Chọn Quận"
                />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  Huyện
                </Text>
                <SelectList
                  data={filteredHuyenData}
                  setSelected={setHuyenSelected}
                  boxStyles={{
                    width: 150,
                    borderColor: COLORS.green,
                    marginTop: 10,
                    marginBottom: 10,
                    borderWidth: 2,
                  }}
                  placeholder="Chọn Huyện"
                />
              </View>
            </View>
            <View>
              <Text>Địa chỉ chi tiết</Text>
              <TextInput
                placeholder="Địa chỉ chi tiết"
                style={styles.textInputBorder}
                value={diaChiChiTietInputed}
                onChangeText={setDiaChiTietInputed}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  Diện tích
                </Text>
                <TextInput
                  style={styles.textInputBorder}
                  placeholder="Dien tich"
                  value={dienTichInputed}
                  onChangeText={setDienTichInputed}
                />
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  Giá cho thuê
                </Text>
                <TextInput
                  style={styles.textInputBorder}
                  placeholder="Gia cho thue"
                  value={giaChoThueInputed}
                  onChangeText={setGiaChoThueInputed}
                />
              </View>
            </View>
            <View>
              <Text>Mô tả</Text>
              <TextInput
                style={[styles.textInputBorder, {height: 150}]}
                placeholder="Mô tả"
                value={moTaInputed}
                onChangeText={setmoTaInputed}
              />
            </View>
            <View>
              <Text>Chọn ảnh</Text>
              <TouchableOpacity onPress={chooseImage} style={styles.button}>
                {images.length > 0 ? (
                  <Swiper loop={false} style={styles.swiper}>
                    {/* Display all images */}
                    {images.map((image, index) => (
                      <Image key={index} source={image} style={styles.image} />
                    ))}
                  </Swiper>
                ) : (
                  <Text style={[styles.text, styles.textInputBorder]}>
                    Chọn ảnh
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.submitBtnWrap}>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <LinearGradient
                  colors={['#0FA914', '#6DF755']}
                  style={styles.linearGradient}
                  useAngle={true}
                  angle={45}>
                  <Text style={styles.submitBtnInner}>Đăng</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  submitBtnWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInputBorder: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: COLORS.green,
  },
  swiper: {
    marginTop: 10,
    marginBottom: 10,
    height: 200,
  },
  image: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default PostNew;
