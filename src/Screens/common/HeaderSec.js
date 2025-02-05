import { View, Text, TextInput, Image ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const HeaderSec = ({headerTitle}) => {
    const navigation = useNavigation();
  return (
    <View style={{width:'100%',height:50,backgroundColor:'#fff',flexDirection:'row'}}>
   <View style={{width:'15%',marginLeft:10,marginTop:7}}> 
    <TouchableOpacity onPress={() => navigation.goBack()}>
    <Image source={require('../../images/arrow.png')} style={{width:22,height:22,marginTop:6,marginLeft:10}} />
    </TouchableOpacity>
     
    </View>
    <View style={{ width: '56%' }}> 
      <Text style={{fontSize:22,fontWeight:'500',color:'#000',marginTop:8}}>{headerTitle}</Text>
    </View>
    <View style={{width:'15%',marginLeft:30,marginTop:7}}> 
        <Image source={require('../../images/bag.png')} style={{width:34,height:34}} />
      </View>
    
  </View>
  )
}

export default HeaderSec