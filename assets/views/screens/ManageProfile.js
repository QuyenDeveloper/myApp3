import { View, Text } from 'react-native'
import React from 'react'
import COLORS from '../../consts/colors';

const ManageProfile = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: COLORS.dark}}>ManageProfile</Text>
    </View>
  )
}

export default ManageProfile