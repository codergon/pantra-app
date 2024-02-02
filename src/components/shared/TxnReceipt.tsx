import millify from 'millify';
import {colors} from 'utils/Theming';
import WalletIcon from './WalletIcon';
import {View, StyleSheet} from 'react-native';
import {Text} from 'components/_ui/typography';
import Divider from 'components/_common/Divider';
import {TransactionReceipt} from 'typings/common';
import {useAccountData} from 'providers/AccountDataProvider';
import {convertHexToUtf8, truncate} from 'utils/HelperUtils';

interface TxnDetailsProps {
  txnData: TransactionReceipt;
}

const TxnReceipt = ({txnData}: TxnDetailsProps) => {
  const {ethPrices, activeCurrency} = useAccountData();

  const gasUsed = Number(txnData['gasUsed']);
  const gasPrice = Number(txnData['gasPrice']);

  return (
    <View style={[styles.txnDetails]}>
      <View style={[styles.txn_block]}>
        {['from', 'to', 'block no', 'confirmations'].map((key, i) => {
          return (
            <View key={i} style={[styles.txn_row]}>
              <Text style={[styles.txn_row_label]}>{key}</Text>

              <View style={[styles.txn_row_value]}>
                {(key === 'from' || key === 'to') && (
                  <WalletIcon address={txnData[key]} size={16} />
                )}

                <Text style={[]}>
                  {key === 'from' || key === 'to'
                    ? truncate(txnData[key], 13)
                    : txnData['blockNumber']}
                </Text>
              </View>
            </View>
          );
        })}

        <View style={[styles.txn_row]}>
          <Text style={[styles.txn_row_label, {textTransform: 'capitalize'}]}>
            Status
          </Text>
          <Text
            style={[
              styles.txn_row_value,
              {
                color: txnData['success'] ? colors.success : colors.error,
              },
            ]}>
            {txnData['success'] ? 'Success' : 'Failed'}
          </Text>
        </View>

        <Divider marginVertical={6} />

        <View style={[styles.txn_row]}>
          <Text style={[styles.txn_row_label, {textTransform: 'capitalize'}]}>
            Amount
          </Text>
          <Text style={[styles.txn_row_value]}>
            {millify(Number(txnData?.value) * 1e-18, {
              precision: 2,
            })}{' '}
            ETH (
            {!isNaN(Number(txnData?.value))
              ? '$' +
                millify(
                  Number(txnData?.value) *
                    1e-18 *
                    (ethPrices[activeCurrency?.slug] ?? 0),

                  {precision: 2},
                )
              : ''}
            )
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TxnReceipt;

const styles = StyleSheet.create({
  txnDetails: {
    gap: 18,
    flexDirection: 'column',
  },
  txn_block: {
    gap: 15,
    width: '100%',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'column',
    backgroundColor: colors.accent2,
  },
  txn_row: {
    gap: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txn_row_label: {
    color: colors.subText3,
    textTransform: 'uppercase',
  },
  txn_row_value: {
    gap: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
