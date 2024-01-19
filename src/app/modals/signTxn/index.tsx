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
  return (
    <View style={[styles.container]}>
      <ModalHeader
        name={'Abstract'}
        url={'abstract.technology'}
        icon={require('assets/images/grads/5.png')}
      />

      <AcctInfoBlock />

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
