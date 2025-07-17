import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Gam from '@/app_assets/gam.svg';
import Ja from '@/app_assets/ja.svg';
import Boo from '@/app_assets/boo.svg';
import Grass from '@/app_assets/grass.svg';
import Sprout from '@/app_assets/sprout.svg';
import Flower1 from '@/app_assets/character_screen/customizing_screen/purchase_item_screen/flower1.svg';
import Flower2 from '@/app_assets/character_screen/customizing_screen/purchase_item_screen/flower2.svg';
import Flower3 from '@/app_assets/character_screen/customizing_screen/purchase_item_screen/flower3.svg';
import Character from '@/app_assets/character_screen/customizing_screen/purchase_item_screen/character.svg';
import BigGrass from '@/app_assets/setting_nickname_screen/bigGrass.svg';
import { skinItems } from '@/app_utils/items/skinItems';
import { clothItems } from '@/app_utils/items/clothItems';
import { accessoryItems } from '@/app_utils/items/accessoryItems';
import { router } from 'expo-router';
import { useCharacter } from '@/context/CharacterContext';
import { useEffect } from 'react';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function PurchaseItems({
  selectedSkin,
  selectedCloth,
  selectedAccessory,
}: {
  selectedSkin: string | null;
  selectedCloth: string | null;
  selectedAccessory: string | null;
}) {
  const { setCharacter } = useCharacter();

  useEffect(() => {
    console.log("받은 아이템:", selectedSkin, selectedCloth, selectedAccessory);
    setCharacter({
      skin: selectedSkin,
      cloth: selectedCloth,
      accessory: selectedAccessory,
    });
  }, [selectedSkin, selectedCloth, selectedAccessory]);

  const skinItem = selectedSkin ? skinItems.find((item) => item.id === selectedSkin) : null;
  const clothItem = selectedCloth ? clothItems.find((item) => item.id === selectedCloth) : null;
  const accessoryItem = selectedAccessory ? accessoryItems.find((item) => item.id === selectedAccessory) : null;

  const xOffset = screenWidth * 0.3;
  const yOffset = screenHeight * 0.42;

  const handleCustomizing = () => {
    const params: Record<string, string> = {};

    if (selectedSkin) params.skin = selectedSkin;
    if (selectedCloth) params.cloth = selectedCloth;
    if (selectedAccessory) params.accessory = selectedAccessory;

    router.replace("/main/character");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>감도리가 한층 더 멋있어졌어요!</Text>

      <Flower1 style={{ zIndex: 1, marginBottom: -screenHeight * 0.01 }} />
      <View style={styles.cloverCon}>
        <Flower2 />
        <Flower3 />
      </View>

      <Character style={styles.character} />

      {skinItem && (
        <View
          style={{
            position: 'absolute',
            bottom:
              skinItem.position?.bottom !== undefined
                ? skinItem.position.bottom + yOffset + 21
                : undefined,
            zIndex: 1,

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
            ...clothItem.position,
            bottom:
              clothItem.position?.bottom !== undefined
                ? clothItem.position.bottom + yOffset
                : undefined,
            left:
              clothItem.position?.left !== undefined
                ? clothItem.position.left + xOffset
                : undefined,
            zIndex: 1,
          }}
        />
      )}

      {accessoryItem && (
        <accessoryItem.Component
          width={accessoryItem.size?.width ?? screenWidth * 0.2}
          height={accessoryItem.size?.height ?? screenHeight * 0.2}
          style={{
            position: 'absolute',
            ...accessoryItem.position,
            bottom:
              accessoryItem.position?.bottom !== undefined
                ? accessoryItem.position.bottom + yOffset
                : undefined,
            left:
              accessoryItem.position?.left !== undefined
                ? accessoryItem.position.left + xOffset
                : undefined,
            zIndex: 1,
          }}
        />
      )}

      <BigGrass />

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.receipt}>
          <Text style={{ color: '#fff', fontSize: screenWidth * 0.04, fontWeight: 'bold' }}>
            주문 내역
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCustomizing} style={styles.show}>
          <Text style={{ color: '#fff', fontSize: screenWidth * 0.04, fontWeight: 'bold' }}>
            감도리 보기
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gamjaboo}>
        <View style={{ left: screenWidth * 0.1 }}>
          <Sprout height={screenHeight * 0.02} width={screenWidth * 0.05} />
        </View>

        <View style={styles.name}>
          <Gam height={screenHeight * 0.045} width={screenWidth * 0.08} />
          <Ja height={screenHeight * 0.045} width={screenWidth * 0.08} />
          <Boo height={screenHeight * 0.045} width={screenWidth * 0.08} />
        </View>

        <Grass width={screenWidth * 0.28} style={{ marginTop: -screenHeight * 0.005 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight * 0.07,
    top: screenHeight * 0.025,
  },
  character: {
    zIndex: 1,
    marginBottom: -screenHeight * 0.055,
  },
  gamjaboo: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.4,
    top: screenHeight * 0.2,
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: screenWidth * 0.04,
    bottom: screenHeight * 0.07,
  },
  cloverCon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: screenHeight * 0.02,
    gap: screenWidth * 0.15,
  },
  receipt: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.35,
    height: screenHeight * 0.07,
    borderRadius: screenWidth * 0.08,
    backgroundColor: '#32D77D',
    marginRight: screenWidth * 0.015,
    zIndex: 2,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 2,
  },
  show: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.35,
    height: screenHeight * 0.07,
    borderRadius: screenWidth * 0.08,
    backgroundColor: '#32D77D',
    marginLeft: screenWidth * 0.015,
    zIndex: 2,
    // shadow at ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // shadow at Android
    elevation: 2,
  },
});
