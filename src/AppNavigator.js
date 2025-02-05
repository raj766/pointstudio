import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Home from './Screens/Home';
import MainAll from './Screens/bottom/MainAll';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Stack = createStackNavigator();
const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        
        const token = await AsyncStorage.getItem('apiToken');  // Get token from storage
        if (token) {
          setIsLoggedIn(true);  // If token exists, set user as logged in
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);
  return (

    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName='MainAll'
      >
        <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false  }} name="MainAll" component={MainAll} />
        <Stack.Screen options={{ headerShown: false  }} name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default AppNavigator