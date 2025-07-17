import { Slot } from 'expo-router';
import { NicknameProvider } from '@/context/NicknameContext';
import Toast from 'react-native-toast-message';
import { CharacterProvider } from '@/context/CharacterContext';
import { GamdoringProvider } from '@/context/GamdoringContext';

export default function Layout() {
  return (
    <NicknameProvider>
      <GamdoringProvider>
        <CharacterProvider>
          <Slot />
          <Toast />
        </CharacterProvider>
      </GamdoringProvider>
    </NicknameProvider>
  );
}
