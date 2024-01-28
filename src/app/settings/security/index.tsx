import {styles} from './styles';
import {colors} from 'utils/Theming';
import {ScrollView, View} from 'react-native';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {Header, RgText} from 'components/_ui/typography';

const SecuritySettings = () => {
  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={{gap: 6}}>
          <Header>SecuritySettings</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Manage wallets, accounts, and addresses
          </RgText>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.settings]}>
        {/* {[account]?.map((wallet, i) => {
          return <WalletItem key={i} wallet={wallet!} />;
        })} */}
      </ScrollView>
    </Container>
  );
};

export default SecuritySettings;
