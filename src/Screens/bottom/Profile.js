import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiCallToken } from '../../Services/ApiServices';
import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

const UserDashboard = ({ userName, appVersion }) => {
  const [custname, setCustName] = useState('User');
  const navigation = useNavigation();
  const getuser = async () => {
    const name = await AsyncStorage.getItem('username');

    setCustName(name)
  }

  useEffect(() => {
    getuser();
  }, [])
  const logout = async () => {
        await AsyncStorage.removeItem('empType');
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('userId');
        navigation.replace('Login');
  };
  return (
    <View style={styles.container}>
      {/* User Profile Icon */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/80' }} width={80} height={80} />
        <Text style={styles.userName}>{custname ? custname : ""}</Text>
      </View>

      {/* Menu Items */}
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyOrder')}>
          <Text style={styles.menuText}>Order List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity> */}
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity 
      onPress={logout}
      style={styles.logoutButton}>
        <Text style={styles.logoutText} >Logout</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.versionText}>App Version: 1.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  menuContainer: {
    // flexGrow: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
    elevation: 2, // For shadow effect
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  versionText: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
});

export default UserDashboard;
