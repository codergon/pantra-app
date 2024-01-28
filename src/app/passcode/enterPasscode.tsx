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

const EnterPasscode = ({
  route,
  navigation,
}: RootStackScreenProps<'enterPasscode'>) => {
  const [code, setCode] = useState<number[]>([]);
  const {updateSettings, passcode} = useSettings();

  const onComplete = (newCodes: number[]) => {
    if (newCodes?.join('') === passcode) {
      // navigation.pop(2);
    }
  };

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header, {paddingTop: 40}]}>
        {!true && <BackBtn />}

        <View style={{gap: 6}}>
          <Header>Enter Passcode</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Enter your 6-digit passcode to continue
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

export default EnterPasscode;
