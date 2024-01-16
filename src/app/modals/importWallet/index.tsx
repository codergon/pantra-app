import {styles} from './styles';
import {RgText} from 'components/_ui/typography';
import {TouchableOpacity, View} from 'react-native';
import {BottomSheetParams} from 'typings/navigation';
import {Key, TextColumns} from 'phosphor-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

const ImportWalletModal = ({
  navigation,
}: BottomSheetScreenProps<BottomSheetParams, 'importWalletModal'>) => {
  const insets = useSafeAreaInsets();

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
          }}
          onLayout={e => {
            console.log(e.nativeEvent.layout.height);
          }}>
          {[
            {
              title: 'Mnemonic Phrase',
              onPress: () => {
                navigation.navigate('Onboarding', {
                  screen: 'walletFromMnemonic',
                });
              },
              icon: <TextColumns weight="regular" size={18} color={'#fff'} />,
              description: 'Import your wallet using your Mnemonic Phrase',
            },
            {
              title: 'Private Key',
              icon: <Key weight="regular" size={16} color={'#fff'} />,
              onPress: () => {
                navigation.navigate('Onboarding', {
                  screen: 'walletFromPrivateKey',
                });
              },
              description: 'Import your wallet using your Private Key',
            },
          ].map((btn, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={btn.onPress}
                style={[
                  styles.actionBtn,
                  {
                    paddingTop: i === 0 ? 6 : 15,
                    paddingBottom: i === 1 ? 6 : 15,
                    borderBottomWidth: i === 1 ? 0 : 1,
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
