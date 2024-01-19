import styles from '../styles';
import {useApp} from 'providers/AppProvider';
import {Container} from 'components/_ui/custom';
import {TouchableOpacity, View} from 'react-native';
import {ArrowDown, Wallet} from 'phosphor-react-native';
import {Header, RgText} from 'components/_ui/typography';
import {AppStackScreenProps} from 'typings/navigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AddAccount = ({navigation}: AppStackScreenProps<'addAccount'>) => {
  const insets = useSafeAreaInsets();
  const {createSmartWallet} = useApp();

  return (
    <Container
      style={[
        styles.container,
        {
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 10,
        },
      ]}>
      <View style={[styles.body]}>
        <View style={{gap: 4}}>
          <Header>Let's add a wallet</Header>
          <RgText
            style={[
              {
                fontSize: 14,
                color: '#777',
                // textAlign: "center",
              },
            ]}>
            To get started, you need to add a wallet
          </RgText>
        </View>

        <View
          style={{
            gap: 16,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          {[
            {
              title: 'Create Smart wallet',
              onPress: () => {
                createSmartWallet({
                  type: 'new',
                });
                navigation.replace('Main');
              },
              icon: <Wallet weight="bold" size={18} color={'#fff'} />,
              description: 'Create a new wallet with automated smart savings',
            },
            {
              title: 'Use existing wallet',
              icon: <ArrowDown weight="bold" size={16} color={'#fff'} />,
              onPress: () => {
                navigation.navigate('importWalletModal');
              },
              description: 'Restore wallet with private key or mnemonic',
            },
          ].map((btn, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={btn.onPress}
                style={[styles.actionBtn]}>
                <View style={[styles.actionBtn__Icon]}>{btn.icon}</View>

                <View
                  style={{
                    gap: 5,
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
    </Container>
  );
};

export default AddAccount;
