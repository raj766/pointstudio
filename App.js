import { View, Text } from 'react-native'
import React ,{ useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from './src/AppNavigator';

const App = () => {
 
  return (
    <AppNavigator />  
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App