import {styles} from './styles';
import {colors} from 'utils/Theming';
import WalletItem from './walletItem';
import {ScrollView, View} from 'react-native';
import FullBtn from 'components/shared/fullBtn';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {useWallet} from 'providers/WalletProvider';
import {useAccountData} from 'providers/AccountDataProvider';
import {Header, RgText, Text} from 'components/_ui/typography';

const Wallets = () => {
  const {account} = useWallet();
  const {clearAccounts} = useAccountData();

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={{gap: 6}}>
          <Header>Wallets</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Manage wallets, accounts, and addresses
          </RgText>
        </View>
      </View>

      {!account ? (
        <View style={[styles.no_sessions]}>
          <RgText style={[{fontSize: 20}]}>No Wallet discovered</RgText>
        </View>
      ) : (
        <ScrollView contentContainerStyle={[styles.settings]}>
          {[account]?.map((wallet, i) => {
            return <WalletItem key={i} wallet={wallet!} />;
          })}

          <View style={{width: '100%', paddingHorizontal: 18}}>
            <FullBtn
              onPress={() => {
                clearAccounts();
              }}
              style={{
                marginTop: 20,
                paddingVertical: 12,
                backgroundColor: colors.accent2,
              }}>
              <Text style={{color: colors.white}}>
                Remove All Accounts and Logout
              </Text>
            </FullBtn>
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default Wallets;
