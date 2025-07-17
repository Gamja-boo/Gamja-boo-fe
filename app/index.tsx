import { View, StyleSheet } from 'react-native';
import { LoginPage } from '@/app_components/LoginPage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkNickname = async () => {
      const nickname = await AsyncStorage.getItem('nickname');
      if (nickname) {
        router.replace('/main');
      }
      setIsLoading(false);
    };
    checkNickname();
  }, [router]);

  if (isLoading) return null;

  return (
    <View style={styles.container}>
      <LoginPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#32D77D',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
