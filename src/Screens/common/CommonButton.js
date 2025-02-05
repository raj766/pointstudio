import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CommonButton = ({onPress,title,bgColor,textColor }) => {
  return (
    <TouchableOpacity 
    onPress={()=>{onPress()}}
    style={{backgroundColor:bgColor,justifyContent:'center',alignItems:'center',width:'85%',height:50,borderRadius:10,alignSelf:'center',marginTop:30}}>
      <Text style={{color:textColor}} >{title}</Text>
    </TouchableOpacity>
  )
}

export default CommonButton