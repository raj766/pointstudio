import { View, Text, Image } from 'react-native'
import React, {useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status
    const navigation = useNavigation();
    // useEffect(() => {
    //   const checkLoginStatus = async () => {
    //     try {
    //       const token = await AsyncStorage.getItem('apiToken');  // Get token from storage
    //       if (token) {
    //         setIsLoggedIn(true);  // If token exists, set user as logged in
    //       }
    //     } catch (error) {
    //       console.log('Error checking login status:', error);
    //     }
    //   };
  
    //   checkLoginStatus();
    // }, []);
    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem('apiToken');  // Get token from storage
          if (token) {
            setTimeout(() => {
           
              navigation.navigate('Login');       
          }, 3000);
          }else{
            setTimeout(() => {
              navigation.navigate('Login');       
          }, 3000);
          }
        } catch (error) {
          console.log('Error checking login status:', error);
        }
      };
  
      checkLoginStatus();
        // setTimeout(() => {
        //     navigation.navigate('Login');       
        // }, 2000);
     
    }, []);
    
  return (
    <View style={{flex:1,justifyContent:'center',backgroundColor:"#fff",alignItems:'center'}}>
      <Image source={require('../images/appicon.png')} style={{width:200,height:200,resizeMode:'center'}} />
    </View>
  )
}

export default Splash