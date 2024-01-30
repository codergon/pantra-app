import {styles} from './styles';
import {colors} from 'utils/Theming';
import {X} from 'lucide-react-native';
import {useQuery} from '@tanstack/react-query';
import {Text} from 'components/_ui/typography';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import {BottomSheetParams} from 'typings/navigation';
import {alchemy} from 'providers/AccountDataProvider';
import TxnReceipt from 'components/shared/TxnReceipt';
import {Linking, TouchableOpacity, View} from 'react-native';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

const TxnReceiptModal = ({
  route,
}: BottomSheetScreenProps<BottomSheetParams, 'txnDetails'>) => {
  const {txnHash} = route.params;
  const {close} = useBottomSheet();

  const {data, isLoading} = useQuery(
    ['txn-receipt', txnHash],
    async () => {
      return await alchemy.core.getTransactionReceipt(txnHash);
    },
    {
      enabled: !!txnHash,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={[{fontSize: 18}]}>Transaction Details</Text>
        <TouchableOpacity onPress={() => close()} style={[styles.closeBtn]}>
          <X size={16} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>{data && <TxnReceipt txnData={data} />}</View>

      <View style={[styles.actionBtns]}>
        <AcceptRejectButton
          title={'View on Etherscan'}
          accept={true}
          onPress={() => {
            Linking.openURL(
              `https://etherscan.io/tx/${txnHash}?utm_source=pantra_wallet`,
            );
          }}
        />
      </View>
    </View>
  );
};

export default TxnReceiptModal;
