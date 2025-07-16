import { Slot } from 'expo-router';
import { NicknameProvider } from '@/context/NicknameContext';
import Toast from 'react-native-toast-message';
import { CharacterProvider } from '@/context/CharacterContext';

export default function Layout() {
  return (
    <NicknameProvider>
      <CharacterProvider>
        <Slot />
        <Toast />
      </CharacterProvider>
    </NicknameProvider>
  );
}
