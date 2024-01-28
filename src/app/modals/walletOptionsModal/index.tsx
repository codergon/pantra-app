import {styles} from './styles';
import {View} from 'react-native';
import {colors} from 'utils/Theming';
import WalletOption from './walletOption';
import {Unlink} from 'lucide-react-native';
import useClipboard from 'hooks/useClipboard';
import {useNavigation} from '@react-navigation/native';
import {BottomSheetParams, RootTabParamList} from 'typings/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Copy, QrCode, Password, PencilSimple} from 'phosphor-react-native';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

const WalletOptionsModal = ({
  route,
}: BottomSheetScreenProps<BottomSheetParams, 'walletOptions'>) => {
  const {wallet} = route.params;
  const [copied, CopyToClipboard] = useClipboard();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParamList>>();

  return (
    <View style={[styles.container]}>
      {[
        {
          label: copied ? 'Copied' : 'Copy',
          icon: (
            <Copy
              size={20}
              weight={copied ? 'fill' : 'regular'}
              color={colors[copied ? 'primary' : 'white']}
            />
          ),
          onPress: () => CopyToClipboard(wallet.address),
        },
        {
          label: 'Edit',
          onPress: () => navigation.replace('editWallet', {wallet}),
          icon: <PencilSimple weight="regular" size={20} color={'#fff'} />,
        },
        {
          label: 'Show Address',
          icon: <QrCode weight="regular" size={20} color={'#fff'} />,
          onPress: () =>
            navigation.navigate('shareQR', {address: wallet.address}),
        },
        {
          label: 'View Passphrase',
          onPress: () => navigation.replace('viewPassphrase', {wallet}),
          icon: <Password weight="regular" size={18} color={colors.white} />,
        },
        {
          color: colors.error,
          label: 'Remove Account',
          onPress: () => console.log('Remove Account'),
          icon: <Unlink size={15} strokeWidth={2.6} color={colors.error} />,
        },
      ].map((option, i) => {
        return <WalletOption key={i} option={option} />;
      })}
    </View>
  );
};

export default WalletOptionsModal;
