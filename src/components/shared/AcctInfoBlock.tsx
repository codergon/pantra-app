import {colors} from 'utils/Theming';
import WalletIcon from './WalletIcon';
import {truncate} from 'utils/HelperUtils';
import {StyleSheet, View} from 'react-native';
import {useWallet} from 'providers/WalletProvider';
import {RgText, Text} from 'components/_ui/typography';
import {useAccountData} from 'providers/AccountDataProvider';

const AcctInfoBlock = () => {
  const {account} = useWallet();
  const {ethBalance, activeCurrency, ethPrices} = useAccountData();

  return (
    <View style={[styles.info_block]}>
      <WalletIcon address={account?.address!} size={44} />

      <View
        style={{
          gap: 4,
          flex: 1,
          flexDirection: 'column',
        }}>
        <Text style={[styles.infoText, {color: colors.warning}]}>
          {account?.name ?? 'Main Wallet'}
          <Text style={{fontSize: 13, color: colors.warning}}>
            {truncate(account?.address ?? '', 12)}
          </Text>
        </Text>
        <RgText style={[styles.infoText_desc]}>
          Balance: {Number(ethBalance).toFixed(4)} ETH ({activeCurrency?.symbol}
          {Number(
            Number(ethBalance || 0) * (ethPrices[activeCurrency?.slug] || 0),
          )?.toFixed(2)}
          )
        </RgText>
      </View>
    </View>
  );
};

export default AcctInfoBlock;

const styles = StyleSheet.create({
  info_block: {
    gap: 16,
    width: '100%',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,

    borderWidth: 1,
    borderColor: colors.accent3,
    backgroundColor: colors.accent3 + '3335e',
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 42,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent3,
  },
  infoText: {
    fontSize: 14,
  },
  infoText_desc: {
    fontSize: 13,
    color: colors.subText2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
