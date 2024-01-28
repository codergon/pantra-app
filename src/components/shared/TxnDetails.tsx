import millify from 'millify';
import TxnData from './TxnData';
import {colors} from 'utils/Theming';
import WalletIcon from './WalletIcon';
import {truncate} from 'utils/HelperUtils';
import {Text} from 'components/_ui/typography';
import Divider from 'components/_common/Divider';
import {View, StyleSheet, ScrollView} from 'react-native';

interface TxnDetailsProps {
  showTxnData?: boolean;
  txnData: {
    [key: string]: any;
  };
  txnDataKeys: string[];
}

const TxnDetails = ({
  txnData,
  showTxnData = true,
  txnDataKeys,
}: TxnDetailsProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.txnDetails]}>
      <View style={[styles.txn_block]}>
        {(
          Object.keys(txnData).filter(i =>
            txnDataKeys.includes(i),
          ) as (keyof typeof txnData)[]
        ).map((key, i) => {
          return (
            <View key={i} style={[styles.txn_row]}>
              <Text style={[styles.txn_row_label]}>{key}</Text>

              <View style={[styles.txn_row_value]}>
                {(key === 'from' || key === 'to') && (
                  <WalletIcon addres={txnData[key]} size={16} />
                )}

                <Text style={[]}>
                  {key === 'from' || key === 'to'
                    ? truncate(txnData[key], 12)
                    : key === 'amount'
                    ? millify(Number(txnData[key]), {
                        precision: 5,
                      }) +
                      ' ' +
                      txnData.symbol
                    : txnData[key]}
                </Text>
              </View>
            </View>
          );
        })}

        <Divider marginVertical={6} />

        <View style={[styles.txn_row]}>
          <Text style={[styles.txn_row_label, {textTransform: 'capitalize'}]}>
            Estimated Fee
          </Text>
          <Text style={[styles.txn_row_value]}>
            {txnData.fee} {txnData.feeSymbol}
          </Text>
        </View>
        <View style={[styles.txn_row]}>
          <Text style={[styles.txn_row_label, {textTransform: 'capitalize'}]}>
            Total Value
          </Text>
          <Text style={[styles.txn_row_value]}>
            {millify(Number(txnData.amount) + Number(txnData.fee), {
              space: true,
              precision: 5,
            })}
          </Text>
        </View>
      </View>

      {showTxnData && <TxnData txnData={txnData} />}
    </ScrollView>
  );
};

export default TxnDetails;

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
