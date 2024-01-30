import {styles} from './styles';
import {View} from 'react-native';
import {BottomSheetParams} from 'typings/navigation';
import ModalHeader from 'components/modals/modalHeader';
import AcctInfoBlock from 'components/shared/AcctInfoBlock';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

const PairModal = ({
  navigation,
}: BottomSheetScreenProps<BottomSheetParams, 'pairModal'>) => {
  return (
    <View style={[styles.container]}>
      <ModalHeader
        name={'Abstract'}
        url={'abstract.technology'}
        icon={require('assets/images/grads/2.png')}
      />

      <AcctInfoBlock />

      <View style={[styles.actionBtns]}>
        <AcceptRejectButton
          title={'Decline'}
          accept={false}
          onPress={() => {}}
        />
        <AcceptRejectButton
          title={'Connect'}
          accept={true}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default PairModal;
