import { View, Text } from 'react-native'
import React from 'react'
import COLORS from '../../consts/colors';

const About = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: COLORS.dark}}>About</Text>
    </View>
  )
}

export default About