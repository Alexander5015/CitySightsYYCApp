import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={{activeOpacity: 1}} onPress={() => navigation.navigate('HomeScreen')}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{activeOpacity: 1}} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.headerText}>CitySightsYYC</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileIconContainer} onPress={() => navigation.navigate('ProfileScreen')}>
        <Image
          source={require('../../assets/profile.png')}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
    paddingLeft: 20,
    height: 100,
    backgroundColor: '#fff',
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 2, width: 0 },
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 7
  },
  profileIconContainer: {
    marginRight: 20,
    activeOpacity: 1
  },
  profileIcon: {
    width: 40,
    height: 40,
    marginLeft: 163
  },
});

export default Header;