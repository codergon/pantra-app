import {useState} from 'react';
import {styles} from './styles';
import {View} from 'react-native';
import {colors} from 'utils/Theming';
import DialpadKeypad from 'components/Dialpad';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {useSettings} from 'providers/SettingsProvider';
import DialpadPin from 'components/Dialpad/DialpadPin';
import {RootStackScreenProps} from 'typings/navigation';
import {Header, RgText} from 'components/_ui/typography';

const ConfirmPasscode = ({
  route,
  navigation,
}: RootStackScreenProps<'confirmPasscode'>) => {
  const codes = route.params.codes;

  const [code, setCode] = useState<number[]>([]);
  const {updateSettings, setPasscode} = useSettings();

  const onComplete = (newCodes: number[]) => {
    if (newCodes?.join('') === codes?.join('')) {
      setPasscode(newCodes?.join('')?.trim());
      updateSettings('passcode', true);
      navigation.pop(2);
    }
  };

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={{gap: 6}}>
          <Header>Confirm passcode</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Re-enter digits to confirm passcode
          </RgText>
        </View>
      </View>

      <View style={[styles.content]}>
        <DialpadPin code={code} />
      </View>

      <DialpadKeypad code={code} setCode={setCode} onComplete={onComplete} />
    </Container>
  );
};

export default ConfirmPasscode;
