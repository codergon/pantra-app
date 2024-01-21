import {styles} from './styles';
import {View} from 'react-native';
import millify from 'millify';
import {truncate} from 'utils/HelperUtils';
import {Text} from 'components/_ui/typography';
import FastImage from 'react-native-fast-image';
import Divider from 'components/_common/Divider';
import makeBlockie from 'ethereum-blockies-base64';
import {BottomSheetParams} from 'typings/navigation';
import ModalHeader from 'components/modals/modalHeader';
import AcctInfoBlock from 'components/shared/AcctInfoBlock';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';
import {colors} from 'utils/Theming';
import {CaretDoubleDown, CaretDown, Note} from 'phosphor-react-native';

const SignTxnModal = ({
  navigation,
}: BottomSheetScreenProps<BottomSheetParams, 'signTxnModal'>) => {
  const txnData = {
    amount: '8.34791',
    from: '0xfe83aa8439a8699a25ca47d81e9be430f5476f93',
    to: '0xf521fC8d46007f5cb9dAf69e873541843294E834',
    symbol: 'ETH',
    fee: '0.00091',
    feeSymbol: 'ETH',
    network: 'LightLink',
  };

  const txnDataKeys = ['amount', 'from', 'to', 'network'];

  return (
    <View style={[styles.container]}>
      <ModalHeader
        name={'Abstract'}
        url={'abstract.technology'}
        icon={require('assets/images/grads/5.png')}
      />

      {/* <View style={[styles.txnMethodContainer]}>
        <View style={[styles.txnMethod]}>
          <Text style={{fontSize: 12}}>Transfer</Text>
        </View>
      </View> */}

      <AcctInfoBlock />

      <View style={[styles.txnDetails]}>
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

        <View
          style={{
            gap: 4,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: colors.primary}}>View Data</Text>
          <Note size={16} color={colors.primary} weight="light" />
        </View>
      </View>

      <View style={[styles.actionBtns]}>
        <AcceptRejectButton
          title={'Decline'}
          accept={false}
          onPress={() => {}}
        />
        <AcceptRejectButton
          title={'Confirm'}
          accept={true}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default SignTxnModal;
