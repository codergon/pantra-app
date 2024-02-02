import axios from 'axios';
import {styles} from './styles';
import {colors} from 'utils/Theming';
import {X} from 'lucide-react-native';
import {XCircle} from 'phosphor-react-native';
import {Text} from 'components/_ui/typography';
import {useQuery} from '@tanstack/react-query';
import {useWallet} from 'providers/WalletProvider';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import {BottomSheetParams} from 'typings/navigation';
import TxnReceipt from 'components/shared/TxnReceipt';
import EmptyState from 'components/shared/emptyState';
import {Linking, TouchableOpacity, View} from 'react-native';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

const TxnReceiptModal = ({
  route,
}: BottomSheetScreenProps<BottomSheetParams, 'txnDetails'>) => {
  const {txnHash} = route.params;
  const {close} = useBottomSheet();
  const {currentRPC} = useWallet();

  const {data, isLoading, error} = useQuery(
    ['txn-receipt', txnHash],
    async () => {
      return await axios
        .get(
          `https://${currentRPC}/api?module=transaction&action=gettxinfo&txhash=${txnHash}`,
        )
        .then(res => res.data?.result);
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

      <View style={{flex: 1}}>
        {!data || error || isLoading ? (
          <>
            <View style={[styles.txn_block]}>
              <EmptyState
                errorIcon={
                  <XCircle size={30} weight="light" color={colors.white} />
                }
                error={error}
                isLoading={isLoading}
                emptyIcon={
                  <XCircle size={30} weight="light" color={colors.white} />
                }
                data={{
                  message: 'Transaction details not found',
                  loadingText: 'Fetching transaction...',
                  errorMessage: 'Could not load transaction details',
                }}
              />
            </View>
          </>
        ) : (
          <TxnReceipt txnData={data} />
        )}
      </View>

      <View style={[styles.actionBtns]}>
        <AcceptRejectButton
          title={'View on Blockscout'}
          accept={true}
          onPress={() => {
            Linking.openURL(
              `https://${currentRPC}/tx/${txnHash}?utm_source=pantra_wallet`,
            );
          }}
        />
      </View>
    </View>
  );
};

export default TxnReceiptModal;
