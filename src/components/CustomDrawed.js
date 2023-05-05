import { StyleSheet,View, Text, ImageBackground, Image} from 'react-native'
import React from 'react'
import COLORS from '../consts/colors'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { height } from '@mui/system'

const CustomDrawed = props => {
  return (
    <View style={{flex: 1}}>
    <DrawerContentScrollView 
    {...props}
    contentContainerStyle={{backgroundColor: COLORS.light}}>
       <ImageBackground source={require('../assets/menu-bg.jpg')} style={{paddingVertical: 30}}>
            <View style={style.avatarWapper}>
                <Image source={require('../assets/person.jpg')} style={style.avatar}></Image>
            </View>
       </ImageBackground>
        <DrawerItemList {...props}> 

        </DrawerItemList>
    </DrawerContentScrollView>
    </View>
  );
}
const style = StyleSheet.create({
    avatarWapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: 
{
   
    borderRadius: 50,
    height: 100,
    width: 100,
    
}
});
export default CustomDrawed