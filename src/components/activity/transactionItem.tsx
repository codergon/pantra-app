import dayjs from 'dayjs';
import millify from 'millify';
import {colors} from 'utils/Theming';
import {truncate} from 'utils/HelperUtils';
import {Text} from 'components/_ui/typography';
import {TransactionReceipt} from 'typings/txns';
import {useWallet} from 'providers/WalletProvider';
import {ArrowDown, ArrowUp} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {useAccountData} from 'providers/AccountDataProvider';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ArrowBendUpRight, ArrowBendLeftDown} from 'phosphor-react-native';
import FastImage from 'react-native-fast-image';
import {formatIpfsLink} from 'helpers/common';

interface TransactionItemProps {
  txn: TransactionReceipt;
}

const TransactionItem = ({txn}: TransactionItemProps) => {
  const {account} = useWallet();
  const navigation = useNavigation();
  const {ethPrices, activeCurrency} = useAccountData();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('txnDetails', {txnHash: txn?.tx_hash ?? txn?.hash});
      }}
      activeOpacity={0.6}
      style={[styles.container]}>
      <View style={styles.icon}>
        {txn?.method === 'transfer' ? (
          <>
            <View style={[styles.token_image]}>
              {txn?.token?.icon_url ? (
                <FastImage
                  source={{
                    cache: FastImage.cacheControl.immutable,
                    uri: formatIpfsLink(txn?.token?.icon_url),
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={[{width: '100%', height: '100%'}]}
                />
              ) : (
                <>
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    style={[{width: '100%', height: '100%'}]}
                    source={require('assets/images/masks/mask-2.png')}
                  />
                </>
              )}
            </View>

            {/* {txn?.from?.hash.toLowerCase() !==
            account?.address?.toLowerCase() ? (
              <ArrowBendLeftDown size={20} color={colors.altprimary} />
            ) : (
              <ArrowBendUpRight size={20} color={colors.altprimary} />
            )} */}
          </>
        ) : txn?.from?.hash.toLowerCase() !==
          account?.address?.toLowerCase() ? (
          <ArrowDown size={20} color={colors.primary} />
        ) : (
          <ArrowUp size={20} color={colors.primary} />
        )}
      </View>

      <View style={[styles.details]}>
        <View style={[styles.info]}>
          <Text numberOfLines={1} style={{flex: 1}}>
            {truncate(txn?.tx_hash ?? txn?.hash, 15)?.toUpperCase()}
          </Text>
          <Text style={[{fontSize: 12, color: colors.subText1}]}>
            {dayjs(txn?.timestamp).format('hh:mm a,  DD MMM YYYY')}
          </Text>
        </View>

        <View style={[styles.stats]}>
          {txn?.method === 'transfer' ? (
            <>
              <View
                style={[
                  {
                    gap: 4,
                    alignItems: 'center',
                    flexDirection: 'row',
                  },
                ]}>
                <Text numberOfLines={1} style={[{fontSize: 15}]}>
                  {millify(
                    Number(txn?.total?.value) /
                      Math.pow(10, Number(txn?.total?.decimals)),
                    {
                      precision: 2,
                    },
                  )}
                </Text>

                <Text style={[{fontSize: 15, color: colors.white}]}>
                  {txn?.token?.symbol}
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text numberOfLines={1} style={[{fontSize: 15}]}>
                {millify(Number(txn?.value) * 1e-18, {
                  precision: 2,
                })}{' '}
                ETH
              </Text>
              <Text style={[{fontSize: 13, color: colors.subText}]}>
                {!isNaN(Number(txn?.value))
                  ? activeCurrency?.symbol +
                    millify(
                      Number(txn?.value) *
                        1e-18 *
                        (ethPrices[activeCurrency?.slug] ?? 0),

                      {precision: 2},
                    )
                  : ''}
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent2,
  },

  details: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    gap: 0,
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stats: {
    gap: 3,
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  token_image: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 40,
    overflow: 'hidden',
  },
});
