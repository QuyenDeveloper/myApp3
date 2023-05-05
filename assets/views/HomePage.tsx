import React, {useState} from 'react';
import Navigator from '../components/NavigationTab';
import SearchBarComponent from '../components/searchBarComponent';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomePage() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <View>
          <SearchBarComponent />
          <NavigationContainer independent={true}>
            <Navigator />
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
