import Config from './config';
import {styles} from './styles';
import {colors} from 'utils/Theming';
import {ScrollView, View} from 'react-native';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {useSettings} from 'providers/SettingsProvider';
import {Header, RgText} from 'components/_ui/typography';
import {EyeClosed, ShieldCheck} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';

const SecuritySettings = () => {
  const navigation = useNavigation();
  const {settings, passcode, updateSettings} = useSettings();

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={{gap: 6}}>
          <Header>Security & Privacy</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Manage your security settings
          </RgText>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.settings]}>
        {[
          {
            key: 'privacy',
            label: 'Hide balance',
            icon: <EyeClosed size={18} weight="bold" color={colors.white} />,
            onSwitch: () => {
              updateSettings('privacy', !settings?.privacy);
            },
          },
          {
            key: 'passcode',
            label: 'Enable pin code',
            icon: <ShieldCheck size={18} weight="bold" color={colors.white} />,
            onSwitch: () => {
              navigation.navigate('createPasscode');

              // updateSettings('unlockToSign', !settings?.unlockToSign);
            },
          },
        ].map((config, i) => {
          return <Config key={i} config={config} />;
        })}
      </ScrollView>
    </Container>
  );
};

export default SecuritySettings;
