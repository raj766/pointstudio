import { View, Text, Image, useColorScheme } from 'react-native'
import React ,{useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'

const CustomTextInput = ({ value, onChangeText, placeholder, icon, type }) => {
    const isDarkMode = useColorScheme() === 'dark'
    return (
        <View style={{ width: '85%', height: 50, borderWidth: 0.5, borderRadius: 10, alignSelf: 'center', marginTop: 30, flexDirection: 'row', alignItems: 'center',paddingLeft:20,paddingRight:20 }}>
                <Image source={icon} style={{width:24,height:24}}/>
                <TextInput value={value} onChangeText={txt =>{
                        onChangeText(txt)
                }} placeholder={placeholder} 
                placeholderTextColor={isDarkMode? '#000' : 'black'}
                secureTextEntry={type=='password'?true:false}
                
                keyboardType={type?type:'default'} 
                style={{
                    marginLeft:10,
                    color:isDarkMode ? '#000' : 'black',
                
                }} 
                
                />
        </View>
    )
}

export default CustomTextInput