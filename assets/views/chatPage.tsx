import React, {useState} from 'react';
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
export default function ChatPage() {
  return (
    <View>
      <SearchBarComponent />
      <Text>This is the chat page.</Text>
    </View>
  );
}
