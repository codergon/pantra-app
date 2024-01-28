import millify from 'millify';
import {colors} from 'utils/Theming';
import WalletIcon from './WalletIcon';
import {View, StyleSheet} from 'react-native';
import {Text} from 'components/_ui/typography';
import {TransactionReceipt} from 'alchemy-sdk';
import Divider from 'components/_common/Divider';
import {useAccountData} from 'providers/AccountDataProvider';
import {convertHexToUtf8, truncate} from 'utils/HelperUtils';

interface TxnDetailsProps {
  txnData: TransactionReceipt;
}

const TxnReceipt = ({txnData}: TxnDetailsProps) => {
  const {ethPrices, activeCurrency} = useAccountData();

  const gasUsed = parseInt(txnData['gasUsed'].toHexString(), 16);
  const gasPrice = parseInt(txnData['effectiveGasPrice'].toHexString(), 16);

  return (
    <View style={[styles.txnDetails]}>
      <View style={[styles.txn_block]}>
        {['from', 'to', 'nonce', 'block no'].map((key, i) => {
          return (
            <View key={i} style={[styles.txn_row]}>
              <Text style={[styles.txn_row_label]}>{key}</Text>

              <View style={[styles.txn_row_value]}>
                {(key === 'from' || key === 'to') && (
                  <WalletIcon addres={txnData[key]} size={16} />
                )}

                <Text style={[]}>
                  {key === 'from' || key === 'to'
                    ? truncate(txnData[key], 13)
                    : key === 'nonce'
                    ? '#' + convertHexToUtf8(txnData['transactionIndex'] + '')
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
                color: txnData['status'] === 1 ? colors.success : colors.error,
              },
            ]}>
            {txnData['status'] === 1 ? 'Success' : 'Failed'}
          </Text>
        </View>

        <Divider marginVertical={6} />

        <View style={[styles.txn_row]}>
          <Text style={[styles.txn_row_label, {textTransform: 'capitalize'}]}>
            Transaction Fee
          </Text>
          <Text style={[styles.txn_row_value]}>
            $
            {millify(
              ((gasPrice * gasUsed) / 1e18) * ethPrices[activeCurrency?.slug],
              {
                precision: 2,
              },
            )}{' '}
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
