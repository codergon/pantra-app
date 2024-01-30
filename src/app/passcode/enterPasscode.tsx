import {useState} from 'react';
import {styles} from './styles';
import {colors} from 'utils/Theming';
import useHaptics from 'hooks/useHaptics';
import {Vibration, View} from 'react-native';
import DialpadKeypad from 'components/Dialpad';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {useSettings} from 'providers/SettingsProvider';
import DialpadPin from 'components/Dialpad/DialpadPin';
import {RootStackScreenProps} from 'typings/navigation';
import {Header, RgText} from 'components/_ui/typography';

const EnterPasscode = ({
  route,
  navigation,
}: RootStackScreenProps<'enterPasscode'>) => {
  const isReset = route.params?.isReset;

  const hapticFeedback = useHaptics();

  const [code, setCode] = useState<number[]>([]);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const {passcode, setPasscode, settings, setSettings} = useSettings();

  const onComplete = (newCodes: number[]) => {
    setIsIncorrect(false);
    if (newCodes?.join('') === passcode) {
      if (isReset) {
        setPasscode();
        setSettings({...settings!, passcode: false, biometrics: false});
        navigation.pop(1);
      }
    } else {
      hapticFeedback('notificationError');
      Vibration.vibrate(2000);
      setIsIncorrect(true);

      setTimeout(() => {
        setIsIncorrect(false);
        setCode([]);
      }, 700);
    }
  };

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header, !isReset && {paddingTop: 40}]}>
        {!!isReset && <BackBtn />}

        <View style={{gap: 6}}>
          <Header>Enter Passcode</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Enter your 6-digit passcode to continue
          </RgText>
        </View>
      </View>

      <View style={[styles.content]}>
        <DialpadPin code={code} isIncorrect={isIncorrect} />
      </View>

      <DialpadKeypad code={code} setCode={setCode} onComplete={onComplete} />
    </Container>
  );
};

export default EnterPasscode;
