import {styles} from './styles';
import {View} from 'react-native';
import {BottomSheetParams} from 'typings/navigation';
import TxnDetails from 'components/shared/TxnDetails';
import ModalHeader from 'components/modals/modalHeader';
import AcctInfoBlock from 'components/shared/AcctInfoBlock';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

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
        icon={require('assets/images/grads/grad1.png')}
      />

      <AcctInfoBlock />

      <TxnDetails txnData={txnData} txnDataKeys={txnDataKeys} />

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
