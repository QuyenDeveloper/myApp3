import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';
export default function SearchBarComponent() {
  const [search, setSearch] = useState('');
  const updateSearch = s => {
    setSearch(s);
  };
  return (
    <SearchBar
      onChangeText={updateSearch}
      value={search}
      round={true}
      style={styles.searchBar}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
