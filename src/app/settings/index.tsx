import {colors} from 'utils/Theming';
import {Container} from 'components/_ui/custom';
import FullBtn from 'components/shared/fullBtn';
import Divider from 'components/_common/Divider';
import {BdText, Text} from 'components/_ui/typography';
import {RootTabScreenProps} from 'typings/navigation';
import {ScrollView, StyleSheet, View} from 'react-native';
import {getReadableVersion} from 'react-native-device-info';
import SettingsItem from 'components/settings/SettingsItem';
import {MessageSquareHeart, Satellite} from 'lucide-react-native';
import {
  CurrencyCircleDollar,
  Lock,
  UserGear,
  Wallet,
} from 'phosphor-react-native';

const Settings = ({navigation}: RootTabScreenProps<'settings'>) => {
  const settings = [
    {
      title: 'Wallets',
      onPress: () => navigation.navigate('wallets'),
      description: 'Manage wallets, accounts, and addresses',
      icon: <Wallet size={20} weight={'bold'} color={colors.white} />,
    },
    {
      title: 'Connections',
      onPress: () => navigation.navigate('sessions'),
      description: 'List of active Wallet Connect sessions',
      icon: <Satellite size={20} color={colors.white} />,
    },
    {
      title: 'Security and Privacy',
      description: 'Passcode, Face ID, backup',
      onPress: () => navigation.navigate('security'),
      icon: <Lock size={20} weight={'bold'} color={colors.white} />,
    },
    {
      title: 'Preferences',
      description: 'Configure your preferences',
      onPress: () => navigation.navigate('preferences'),
      icon: <UserGear size={20} weight={'bold'} color={colors.white} />,
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

          <Divider color={colors.accent1} />

          <SettingsItem
            title="Legal"
            link={'https://pantra.vercel.app/legal'}
          />
          <SettingsItem
            title="Version"
            rightIcon={
              <Text style={{fontSize: 16, color: colors.subText2}}>
                {getReadableVersion()}
              </Text>
            }
          />
        </ScrollView>
      </Container>
    </>
  );
};

export default Settings;

export const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
  },

  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  header: {
    gap: 20,
    paddingTop: 4,
    marginBottom: 14,
    paddingBottom: 4,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },

  settings: {
    gap: 24,
    width: '100%',
    flexDirection: 'column',
  },
});
