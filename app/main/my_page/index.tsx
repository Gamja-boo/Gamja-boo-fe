import { View, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Character from '@/app_assets/character_screen/character.svg';
import { skinItems } from '@/app_utils/items/skinItems';
import { clothItems } from '@/app_utils/items/clothItems';
import { accessoryItems } from '@/app_utils/items/accessoryItems';
import BackButton from '@/app_assets/my_page_screen/backButton.svg';
import { Code } from '@/app_components/main_screen/my_page_screen/Code';
import { ShowNickname } from '@/app_components/main_screen/my_page_screen/ShowNickname';
import { Withdraw } from '@/app_components/main_screen/my_page_screen/Withdraw';
import { useCharacter } from '@/context/CharacterContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MyPageScreen() {
  const router = useRouter();

  const { character } = useCharacter();

  const skinItem = character.skin ? skinItems.find((item) => item.id === character.skin) : null;
  const clothItem = character.cloth ? clothItems.find((item) => item.id === character.cloth) : null;
  const accessoryItem = character.accessory ? accessoryItems.find((item) => item.id === character.accessory) : null;

  const yOffset = screenHeight * 0.01;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/main')} style={styles.backCon}>
        <BackButton />
      </TouchableOpacity>

      {/* 추천인 코드 */}
      <Code />

      {/* 감도리 캐릭터 화면 */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.characterCon}>
        <Character />

        {skinItem && (
          <View
            style={{
              position: 'absolute',
              bottom:
                skinItem.position?.bottom !== undefined
                  ? skinItem.position.bottom + yOffset + 21
                  : undefined,
              zIndex: 99,

              borderRadius: screenWidth * 0.5,
              width: (skinItem.size?.width ?? screenWidth * 0.2) * 1.5,
              height: (skinItem.size?.height ?? screenHeight * 0.2) / 2,
              backgroundColor: '#FFE9B8',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <skinItem.Component
              width={skinItem.size?.width ?? screenWidth * 0.2}
              height={skinItem.size?.height ?? screenHeight * 0.2}
            />
          </View>
        )}

        {clothItem && (
          <clothItem.Component
            width={clothItem.size?.width ?? screenWidth * 0.2}
            height={clothItem.size?.height ?? screenHeight * 0.2}
            style={{
              position: 'absolute',
              bottom:
                clothItem.position?.bottom !== undefined
                  ? clothItem.position.bottom + yOffset 
                  : undefined,
              zIndex: 99,
            }}
          />
        )}

        {accessoryItem && (
          <accessoryItem.Component
            width={accessoryItem.size?.width ?? screenWidth * 0.2}
            height={accessoryItem.size?.height ?? screenHeight * 0.2}
            style={{
              position: 'absolute',
              bottom:
                accessoryItem.position?.bottom !== undefined
                  ? accessoryItem.position.bottom + yOffset
                  : undefined,
              zIndex: 99,
            }}
          />
        )}
      </View>

      {/* 사용자 닉네임 */}
      <ShowNickname />

      {/* 회원 탈퇴 */}
      <Withdraw />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFFF6',
    alignItems: 'center',
  },
  characterCon: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.225,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: screenWidth * 0.5,
    backgroundColor: '#ACEC96',
    marginVertical: screenHeight * 0.05,
  },
  backCon: {
    position: 'absolute',
    left: screenWidth * 0.05,
    top: screenHeight * 0.03,
    width: screenWidth * 0.15,
  },
});
