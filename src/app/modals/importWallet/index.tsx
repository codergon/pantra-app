import {styles} from './styles';
import {RgText} from 'components/_ui/typography';
import {TouchableOpacity, View} from 'react-native';
import {Key, TextColumns} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ImportWalletModal = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 10,
        },
      ]}>
      <View style={[styles.body]}>
        <View
          style={{
            gap: 0,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          {[
            {
              title: 'Mnemonic Phrase',
              onPress: () => {
                navigation.navigate('walletFromMnemonic');
              },
              icon: <TextColumns weight="regular" size={18} color={'#fff'} />,
              description: 'Recover wallet from Mnemonic Phrase',
            },
            {
              title: 'Private Key',
              icon: <Key weight="regular" size={16} color={'#fff'} />,
              onPress: () => {
                navigation.navigate('walletFromPrivateKey');
              },
              description: 'Import your wallet from Private Key',
            },
          ].map((btn, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={btn.onPress}
                style={[
                  styles.actionBtn,
                  {
                    paddingTop: i === 0 ? 6 : 14,
                    paddingBottom: i === 1 ? 6 : 14,
                  },
                ]}>
                <View style={[styles.actionBtn__Icon]}>{btn.icon}</View>

                <View
                  style={{
                    gap: 2,
                    flex: 1,
                    flexDirection: 'column',
                  }}>
                  <RgText style={[styles.actionBtn__Text]}>{btn.title}</RgText>
                  <RgText style={[styles.actionBtn__Text__Description]}>
                    {btn.description}
                  </RgText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ImportWalletModal;
