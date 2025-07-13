import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LoginPage } from '@/app_components/LoginPage';

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/login_setting')}>
        <LoginPage />
      </TouchableOpacity>
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
