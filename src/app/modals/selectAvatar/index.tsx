import Avatar from "./avatar";
import { useState } from "react";
import { styles } from "./styles";
import { Check } from "lucide-react-native";
import { useApp } from "providers/AppProvider";
import { FlashList } from "@shopify/flash-list";
import { RgText } from "components/_ui/typography";
import { TouchableOpacity, View } from "react-native";
import { BottomSheetParams } from "typings/navigation";
import { BottomSheetScreenProps } from "@th3rdwave/react-navigation-bottom-sheet";

const avatars = Array.from({ length: 30 }).map(
  (_, i) =>
    `https://api.dicebear.com/7.x/open-peeps/svg?backgroundType=gradientLinear&seed=${i}&scale=90&radius=50&backgroundColor=ecad80,f2d3b1,b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc,9e5622`
);

const SelectAvatar = ({
  navigation,
}: BottomSheetScreenProps<BottomSheetParams, "selectAvatar">) => {
  const { updateAvatar } = useApp();
  const [selectedAvatar, setSelectedAvatar] = useState(2);

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.headerTxtContainer]}>
          <RgText style={[styles.headerTxt]}>Select an avatar</RgText>
          <RgText
            style={[
              {
                fontSize: 14,
                color: "#9B9B9B",
              },
            ]}
          >
            Choose an avatar to represent you
          </RgText>
        </View>

        <TouchableOpacity
          onPress={() => {
            updateAvatar(avatars[selectedAvatar]);
            navigation.goBack();
          }}
          style={[styles.headerBtn]}
        >
          <Check strokeWidth={3} size={20} color="#419B45" />
        </TouchableOpacity>
      </View>

      <View style={[styles.avatars]}>
        <FlashList
          numColumns={6}
          data={[...avatars]}
          overScrollMode="never"
          estimatedItemSize={30}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(i: any, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item, index }) => (
            <Avatar
              item={item}
              index={index}
              setSelectedAvatar={setSelectedAvatar}
              isSelected={selectedAvatar === index}
            />
          )}
        />
      </View>
    </View>
  );
};

export default SelectAvatar;
