import axios from 'axios';
import Constants from 'expo-constants';

const apiClient = axios.create({
  baseURL: Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL,
  timeout: 5000,
});

export default apiClient;
