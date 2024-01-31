import {colors} from 'utils/Theming';
import {Container} from 'components/_ui/custom';
import Divider from 'components/_common/Divider';
import {RootTabScreenProps} from 'typings/navigation';
import WalletIcon from 'components/shared/WalletIcon';
import {RgText, Text} from 'components/_ui/typography';
import {testAddress} from 'providers/AccountDataProvider';
import {ScrollView, StyleSheet, View} from 'react-native';
import {getReadableVersion} from 'react-native-device-info';
import SettingsItem from 'components/settings/SettingsItem';
import {MessageSquareHeart, Satellite} from 'lucide-react-native';
import {
  Lock,
  Wallet,
  UserGear,
  CurrencyCircleDollar,
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
          <Text style={{fontSize: 26}}>Settings</Text>
        </View>

        <ScrollView contentContainerStyle={[styles.settings]}>
          <View style={[styles.illustration]}>
            <WalletIcon size={42} addres={testAddress} />

            <View
              style={{
                gap: 3,
                flex: 1,
                flexDirection: 'column',
              }}>
              <Text style={[styles.illustrationText, {color: colors?.white}]}>
                alphaglitch.eth
              </Text>
              <RgText style={[styles.illustrationText_desc]}>
                0x3a0c4...a2b1
              </RgText>
            </View>
          </View>

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
    gap: 16,
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

  illustration: {
    gap: 16,
    borderRadius: 16,
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.accent1,
  },
  illustrationIcon: {
    width: 42,
    height: 42,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent3,
  },
  illustrationText: {
    fontSize: 17,
  },
  illustrationText_desc: {
    fontSize: 14,
    color: colors.subText2,
  },
});
