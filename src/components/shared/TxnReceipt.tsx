import millify from 'millify';
import {colors} from 'utils/Theming';
import WalletIcon from './WalletIcon';
import {truncate} from 'utils/HelperUtils';
import {View, StyleSheet} from 'react-native';
import {formatIpfsLink} from 'helpers/common';
import {Text} from 'components/_ui/typography';
import FastImage from 'react-native-fast-image';
import {TransactionReceipt} from 'typings/txns';
import Divider from 'components/_common/Divider';
import {useAccountData} from 'providers/AccountDataProvider';

interface TxnDetailsProps {
  txnData: TransactionReceipt;
}

const TxnReceipt = ({txnData}: TxnDetailsProps) => {
  const {ethPrices, activeCurrency} = useAccountData();

  return (
    <View style={[styles.txnDetails]}>
      <View style={[styles.txn_block]}>
        {['from', 'to', 'block', 'nonce'].map((key, i) => {
          return (
            <View key={i} style={[styles.txn_row]}>
              <Text style={[styles.txn_row_label]}>{key}</Text>

              <View style={[styles.txn_row_value]}>
                {(key === 'from' || key === 'to') && (
                  <WalletIcon address={txnData[key]?.hash} size={16} />
                )}

                <Text style={[]}>
                  {key === 'from' || key === 'to'
                    ? truncate(txnData[key]?.hash, 13)
                    : txnData[key as keyof TransactionReceipt]}
                </Text>
              </View>
            </View>
          );
        })}

        <View style={[styles.txn_row]}>
          <Text style={[styles.txn_row_label]}>Status</Text>
          <Text
            style={[
              styles.txn_row_value,
              {
                color:
                  txnData?.result === 'success' ? colors.success : colors.error,
              },
            ]}>
            {txnData?.result === 'success' ? 'Success' : 'Failed'}
          </Text>
        </View>

        <Divider marginVertical={6} />

        {txnData?.method === 'transfer' ? (
          <>
            <View style={[styles.txn_row]}>
              <Text style={[styles.txn_row_label]}>Transferred token</Text>

              <View
                style={[
                  {
                    gap: 4,
                    alignItems: 'center',
                    flexDirection: 'row',
                  },
                ]}>
                <View style={[styles.token_image]}>
                  {txnData?.token_transfers?.[0]?.token?.icon_url ? (
                    <FastImage
                      source={{
                        cache: FastImage.cacheControl.immutable,
                        uri: formatIpfsLink(
                          txnData?.token_transfers?.[0]?.token?.icon_url,
                        ),
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={[{width: '100%', height: '100%'}]}
                    />
                  ) : (
                    <>
                      <FastImage
                        resizeMode={FastImage.resizeMode.cover}
                        style={[{width: '100%', height: '100%'}]}
                        source={require('assets/images/masks/mask2.png')}
                      />
                    </>
                  )}
                </View>
                <Text style={[styles.txn_row_value]}>
                  {txnData?.token_transfers?.[0]?.token?.symbol}
                </Text>
              </View>
            </View>

            <View style={[styles.txn_row]}>
              <Text style={[styles.txn_row_label]}>Amount Transferred</Text>
              <Text style={[styles.txn_row_value]}>
                {millify(
                  Number(txnData?.token_transfers?.[0]?.total?.value) /
                    Math.pow(
                      10,
                      Number(txnData?.token_transfers?.[0]?.total?.decimals),
                    ),
                  {
                    precision: 2,
                  },
                )}
              </Text>
            </View>
          </>
        ) : (
          <View style={[styles.txn_row]}>
            <Text style={[styles.txn_row_label]}>Amount</Text>
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
        )}
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
    textTransform: 'capitalize',
  },
  txn_row_value: {
    gap: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  token_image: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
