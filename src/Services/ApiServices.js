import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE_URL = 'https://pointstudio.co.in/api';

// Create an Axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds
    headers: {
      'Content-Type': 'application/json'
    },
  });
  
   // Example API call: GET request
export const getApiCallToken = async (urls) => {
  try {
    // Get the token from AsyncStorage
    // const token = await AsyncStorage.getItem('userId');
    // console.log('token',token)
    // Create an Axios instance
    // const apisCalToken = axios.create({
    //   baseURL: API_BASE_URL,
    //   timeout: 10000, // 10 seconds
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`, // Add token if available
    //   },
    // });
    // const response = await apisCalToken.get(urls);
    // return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

   // Example API call: GET request
   export const postApiCallToken = async (urls,data) => {
    try {
      // Get the token from AsyncStorage
      // const token = await AsyncStorage.getItem('apiToken');
      // console.log('token',token)
      // // Create an Axios instance
      // const apisCalToken = axios.create({
      //   baseURL: API_BASE_URL,
      //    timeout: 10000, // 10 seconds
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`, // Add token if available
      //   },
      // });
      // const response = await apisCalToken.post(urls,data);
      // return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };
  // Example API call: GET request
export const getApiCall = async (urls) => {
    try {
      const response = await api.get(urls);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };
   
  // Example API call: POST request
  export const postApiCall = async (urls,data) => {
    try {
      console.log('postfields:',data)
      const response = await api.post(urls, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };
  
  // Function to handle errors
  const handleApiError = (error) => {
    console.error('API Error:', error);
    // Implement error handling logic, e.g., show a toast or dialog
    throw error; // Re-throw the error after logging it
  };
  
  // You can export other API functions similarly
  