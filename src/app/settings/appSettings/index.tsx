import {styles} from './styles';
import {colors} from 'utils/Theming';
import {ScrollView, View} from 'react-native';
import {Container} from 'components/_ui/custom';
import FullBtn from 'components/shared/fullBtn';
import Divider from 'components/_common/Divider';
import {BdText, Text} from 'components/_ui/typography';
import {SettingsStackScreenProps} from 'typings/navigation';
import {getReadableVersion} from 'react-native-device-info';
import SettingsItem from 'components/settings/SettingsItem';
import {MessageSquareHeart, Satellite} from 'lucide-react-native';
import {CurrencyCircleDollar, Lock, Wallet} from 'phosphor-react-native';

const AppSettings = ({navigation}: SettingsStackScreenProps<'appSettings'>) => {
  const settings = [
    {
      title: 'All Wallets',
      onPress: () => navigation.navigate('currencies'),
      description: 'Manage wallets, accounts, and addresses',
      icon: <Wallet size={20} weight={'bold'} color={colors.white} />,
    },
    {
      title: 'Connections',
      onPress: () => navigation.navigate('sessions'),
      description: 'Active sessions and connected apps',
      icon: <Satellite size={20} color={colors.white} />,
    },
    {
      title: 'Security and Privacy',
      description: 'Passcode, Face ID, backup',
      onPress: () => navigation.navigate('currencies'),
      icon: <Lock size={20} weight={'bold'} color={colors.white} />,
    },
    {
      title: 'Currency',
      description: 'Current: USD($)',
      onPress: () => navigation.navigate('currencies'),
      icon: (
        <CurrencyCircleDollar size={20} weight={'bold'} color={colors.white} />
      ),
    },
    {
      title: 'Help & Support',
      link: 'https://pantra.vercel.app',
      description: 'Help center, contact us',
      icon: <MessageSquareHeart size={20} color={colors.white} />,
    },
  ];

  return (
    <>
      <Container paddingTop={10} style={[styles.container]}>
        <View style={[styles.header]}>
          <BdText style={{fontSize: 22}}>Settings</BdText>
        </View>

        <ScrollView contentContainerStyle={[styles.settings]}>
          {settings?.map((config, i) => {
            return <SettingsItem key={i} {...config} />;
          })}

          <Divider color={colors.accent22} />

          <SettingsItem title="Legal" />
          <SettingsItem
            title="Version"
            rightIcon={
              <Text style={{fontSize: 16, color: colors.subText2}}>
                {getReadableVersion()}
              </Text>
            }
          />

          <View style={{width: '100%', paddingHorizontal: 18}}>
            <FullBtn
              onPress={() => console.log('disconnect')}
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
      </Container>
    </>
  );
};

export default AppSettings;
