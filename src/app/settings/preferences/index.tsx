import Config from './config';
import {styles} from './styles';
import {colors} from 'utils/Theming';
import {ScrollView, View} from 'react-native';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {useSettings} from 'providers/SettingsProvider';
import {FingerprintSimple} from 'phosphor-react-native';
import {Header, RgText} from 'components/_ui/typography';
import {Vibrate} from 'lucide-react-native';

const Preferences = () => {
  const {settings, updateSettings} = useSettings();

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={{gap: 6}}>
          <Header>Preferences</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Manage your preferences
          </RgText>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.settings]}>
        <Config
          config={{
            key: 'haptics',
            label: 'Enable haptics',
            icon: <Vibrate size={18} color={colors.white} />,
            onSwitch: () => {
              updateSettings('biometrics', !settings?.biometrics);
            },
          }}
        />
      </ScrollView>
    </Container>
  );
};

export default Preferences;
