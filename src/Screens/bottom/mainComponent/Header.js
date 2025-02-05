import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Header = ({headerTitle}) => {
  const navigation = useNavigation();
  const logout = async () => {
    const uid = await AsyncStorage.getItem('userId');
    // await AsyncStorage.removeItem('empType');
    // await AsyncStorage.removeItem('userName');
    // await AsyncStorage.removeItem('userId');
    
    if (uid) {
      navigation.replace('Home');  
    }else{
      navigation.replace('Login');
    }
    
};
  return (
    <View style={{width:'100%',height:50,backgroundColor:'#fff',flexDirection:'row'}}>
      <View style={{ width: '75%',marginLeft:10, height:40, alignSelf: 'center', flexDirection: 'row', alignItems: 'center',paddingLeft:15,paddingRight:15 }}> 
        <Text style={{fontSize:20,fontWeight:'600'}}>{headerTitle||'Home'}</Text>
      </View>
      
      <View style={{width:'15%',marginLeft:30,marginTop:7}}> 
      <TouchableOpacity onPress={()=>logout()}>
      <Image source={require('../../../images/signout.png')} style={{width:34,height:34}}  />
      </TouchableOpacity>
        
      </View>
    </View>
  )
}
export default Header