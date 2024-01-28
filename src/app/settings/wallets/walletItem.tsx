import {colors} from 'utils/Theming';
import {IWallet} from 'typings/common';
import {truncate} from 'utils/HelperUtils';
import WalletIcon from 'components/shared/WalletIcon';
import {RgText, Text} from 'components/_ui/typography';
import {useNavigation} from '@react-navigation/native';
import {DotsThreeVertical} from 'phosphor-react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface WalletItemProps {
  wallet: IWallet;
}

const WalletItem = ({wallet}: WalletItemProps) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.platformDetails}
        onPress={() => {
          navigation.navigate('walletOptions', {wallet});
        }}>
        <View style={[styles.imageContainer]}>
          <WalletIcon addres={wallet.address} size={42} />
        </View>

        <View style={[styles.platformInfo]}>
          <Text style={{fontSize: 16}}>{wallet?.name || `Wallet`}</Text>

          <View style={[styles.platformInfo_desc]}>
            <RgText style={{color: colors.subText, fontSize: 14}}>
              {truncate(wallet?.address, 14)}
            </RgText>
          </View>
        </View>

        <View style={[styles.icon]}>
          <DotsThreeVertical size={20} weight="regular" color={colors.white} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default WalletItem;

const styles = StyleSheet.create({
  platformDetails: {
    gap: 18,
    paddingLeft: 18,
    paddingRight: 12,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 42,
    height: 42,
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: colors?.accent,
  },
  platformImage: {
    width: '100%',
    height: '100%',
  },
  platformInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  platformInfo_desc: {
    gap: 2,
    flexDirection: 'column',
  },
  icon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
