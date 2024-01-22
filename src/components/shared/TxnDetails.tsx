import millify from 'millify';
import TxnData from './TxnData';
import {colors} from 'utils/Theming';
import {truncate} from 'utils/HelperUtils';
import {Note} from 'phosphor-react-native';
import {Text} from 'components/_ui/typography';
import FastImage from 'react-native-fast-image';
import Divider from 'components/_common/Divider';
import makeBlockie from 'ethereum-blockies-base64';
import {View, StyleSheet, ScrollView} from 'react-native';

interface TxnDetailsProps {
  txnData: {
    [key: string]: any;
  };
  txnDataKeys: string[];
}

const TxnDetails = ({txnData, txnDataKeys}: TxnDetailsProps) => {
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
                  <View style={[styles.txn_row_value_blockies]}>
                    <FastImage
                      resizeMode="cover"
                      style={[styles.image]}
                      source={{
                        uri: makeBlockie(txnData[key]),
                      }}
                    />
                  </View>
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

      <TxnData txnData={txnData} />
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
  txn_row_value_blockies: {
    width: 16,
    height: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
