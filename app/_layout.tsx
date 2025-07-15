import { Slot } from 'expo-router';
import { NicknameProvider } from '@/context/NicknameContext';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <NicknameProvider>
      <Slot />
      <Toast />
    </NicknameProvider>
  );
}
