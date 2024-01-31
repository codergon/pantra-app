import {styles} from './styles';
import {View} from 'react-native';
import ModalOption from './option';
import {colors} from 'utils/Theming';
import {useWallet} from 'providers/WalletProvider';
import {RootStackParamList} from 'typings/navigation';
import {useNavigation} from '@react-navigation/native';
import {Download, ScanLine, Upload} from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const SelectActionModal = () => {
  const {account} = useWallet();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container]}>
      {[
        {
          label: 'Send',
          description: 'Send funds to another wallet',
          icon: <Upload size={20} color={colors?.primary} />,
          onPress: () => {
            navigation.pop(1);
            navigation.navigate('sendETH');
          },
        },
        {
          label: 'Receive',
          description: 'View and share your wallet address',
          onPress: () => {
            navigation.pop(1);
            navigation.navigate('shareQR', {address: account?.address!});
          },
          icon: <Download size={20} color={colors?.white} />,
        },
        {
          label: 'Scan QR',
          description: 'Scan a WallectConnect QR code',
          onPress: () => {
            navigation.pop(1);
            navigation.navigate('scanQR');
          },
          icon: <ScanLine size={20} color={colors?.white} />,
        },
      ].map((option, i) => {
        return <ModalOption key={i} option={option} />;
      })}
    </View>
  );
};

export default SelectActionModal;
