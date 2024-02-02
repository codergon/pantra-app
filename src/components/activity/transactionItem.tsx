import dayjs from 'dayjs';
import millify from 'millify';
import {colors} from 'utils/Theming';
import {truncate} from 'utils/HelperUtils';
import {ITransaction} from 'typings/common';
import {Text} from 'components/_ui/typography';
import {FileMinus} from 'phosphor-react-native';
import {useWallet} from 'providers/WalletProvider';
import {ArrowDown, ArrowUp} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {useAccountData} from 'providers/AccountDataProvider';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface TransactionItemProps {
  txn: ITransaction;
}

const TransactionItem = ({txn}: TransactionItemProps) => {
  const {account} = useWallet();
  const navigation = useNavigation();
  const {ethPrices, activeCurrency} = useAccountData();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('txnDetails', {txnHash: txn?.hash});
      }}
      activeOpacity={0.6}
      style={[styles.container]}>
      <View style={styles.icon}>
        {txn?.value === null || Number(txn?.value) === 0 ? (
          <FileMinus size={20} color={colors.warning} />
        ) : txn?.from.toLowerCase() == account?.address?.toLowerCase() ? (
          <ArrowDown size={20} color={colors.primary} />
        ) : (
          <ArrowUp size={20} color={colors.primary} />
        )}
      </View>

      <View style={[styles.details]}>
        <View style={[styles.info]}>
          <Text numberOfLines={1} style={{flex: 1}}>
            {truncate(txn?.to!, 15)?.toUpperCase()}
          </Text>
          <Text style={[{fontSize: 12, color: colors.subText1}]}>
            {dayjs(Number(txn?.timeStamp) * 1000).format(
              'hh:mm a,  DD MMM YYYY',
            )}
          </Text>
        </View>

        <View style={[styles.stats]}>
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
    gap: 2,
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stats: {
    gap: 2,
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
});
