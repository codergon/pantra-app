import {colors} from 'utils/Theming';
import Jazzicon from 'react-native-jazzicon';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import makeBlockie from 'ethereum-blockies-base64';
import {useAccountData} from 'providers/AccountDataProvider';

interface WalletIconProps {
  size?: number;
  addres: string;
  jazzicon?: boolean;
}

const WalletIcon = ({addres, size = 20, jazzicon = true}: WalletIconProps) => {
  const {useJazzicons} = useAccountData();

  return (
    <>
      <View
        style={[
          styles.icon,
          {
            width: size,
            height: size,
            borderRadius: size,
          },
        ]}>
        {jazzicon === false || useJazzicons === false ? (
          <FastImage
            resizeMode="cover"
            style={[styles.image]}
            source={{
              uri: makeBlockie(addres),
            }}
          />
        ) : (
          <Jazzicon size={size} address={addres} />
        )}
      </View>
    </>
  );
};

export default WalletIcon;

const styles = StyleSheet.create({
  icon: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
