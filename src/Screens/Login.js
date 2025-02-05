import { View, Text, Image, TextInput,ActivityIndicator,Alert } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from './common/CustomTextInput'
import CommonButton from './common/CommonButton'
import { useNavigation } from '@react-navigation/native'
import { getApiCall , postApiCall} from '../Services/ApiServices'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
    const navigation = useNavigation();
    const [loginLoading, setLoginLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('app.admin@gmail.com');
    // const [password, setPassword] = useState('admin@1234');
    const [bademail, setBasdEmail] = useState(false);
    const [badepassword, setBadPassword] = useState(false);

    const validate = async () => {

        if (email == '') {
            setBasdEmail(true)
            
        }else{
            setBasdEmail(false);
        }
        if (password == '') {
            setBadPassword(true)
            
        }else{
            setBadPassword(false)
        }

        if (bademail==false && badepassword==false) {
            //navigation.navigate('Home');
            setLoginLoading(true)
            const result = await postApiCall('/login',{email:email,password:password});
        
            if (result.status === false) {
                setLoginLoading(false)
                Alert.alert(
                    'Error', // Alert title
                    result.message || 'Something went wrong', // Alert message
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }] // Button
                  );
            }
            if (result.status === true) {
                
                await AsyncStorage.setItem('empType', result.emp_type);
                await AsyncStorage.setItem('userName', result.user);
                // await AsyncStorage.setItem('userId', result.id);
                await AsyncStorage.setItem('userId', JSON.stringify(result.id));
               
                setLoginLoading(false)
                 navigation.navigate('Home')
            }
            //navigation.navigate('Home')
        }else{
            setBadPassword(true)
            setBasdEmail(true)
        }
        
        
    }
    
    return (
        <View style={{ flex: 1,backgroundColor:"#fff" }}>
            <View style={{display:'flex',flexDirection:"row",justifyContent:'space-between'}}>
            {/* <Image source={require('../images/arrow.png')} style={{ width: 48, height: 48, alignSelf: 'center', marginTop: 50 }} /> */}
            
            </View>
             <Text>Hello Developer, welcome to pointstudio</Text>
            <Image source={require('../images/appicon.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 100 }} />
            <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 30, fontWeight: '600', color: '#000' }}>Login</Text>
            
            <CustomTextInput value={email} onChangeText={txt => { setEmail(txt) }} placeholder={'Enter Email ID'} icon={require('../images/email.png')} />
            {bademail==true && (<Text style={{color:'red',marginLeft:30}}>Please enter a valid email ID.</Text>)}
            <CustomTextInput value={password} onChangeText={txt => { setPassword(txt) }} placeholder={'Enter Password'} type={'password'} icon={require('../images/password.png')} />
            {badepassword==true && (<Text style={{color:'red',marginLeft:30}}>Please enter password.</Text>)}
            <CommonButton title={ loginLoading == true ? <ActivityIndicator size="large" color="#fff" />:'Login'} bgColor={'#000'} textColor={'#fff'} onPress={() => { validate() }} />
            {/* <Text style={{ fontSize: 18, fontWeight: '800', alignSelf: 'center', marginTop: 20, textDecorationLine: 'underline' }} onPress={() => { navigation.navigate('Signup') }}>Create New Account?</Text> */}
        </View>
    )
}

export default Login