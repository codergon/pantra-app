import {styles} from './styles';
import {View} from 'react-native';
import {isValidUrl} from 'utils/HelperUtils';
import {BottomSheetParams} from 'typings/navigation';
import {useSession} from 'providers/SessionProvider';
import ModalHeader from 'components/modals/modalHeader';
import AcctInfoBlock from 'components/shared/AcctInfoBlock';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

const PairModal = ({
  navigation,
}: BottomSheetScreenProps<BottomSheetParams, 'pairModal'>) => {
  const {pairedProposal, acceptPair, declinePair} = useSession();

  const url = pairedProposal?.params?.proposer?.metadata?.url;
  const name = pairedProposal?.params?.proposer?.metadata?.name;
  const icon = pairedProposal?.params?.proposer?.metadata?.icons[0];
  const urlHost = isValidUrl(url!) ? new URL(url!).hostname : url!;

  return (
    <View style={[styles.container]}>
      <ModalHeader url={urlHost} name={name!} icon={icon!} />

      <AcctInfoBlock />

      <View style={[styles.actionBtns]}>
        <AcceptRejectButton
          accept={false}
          title={'Decline'}
          onPress={declinePair}
        />
        <AcceptRejectButton
          accept={true}
          title={'Connect'}
          onPress={acceptPair}
        />
      </View>
    </View>
  );
};

export default PairModal;
