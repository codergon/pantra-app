import {useState} from 'react';
import {styles} from './styles';
import {View} from 'react-native';
import {colors} from 'utils/Theming';
import DialpadKeypad from 'components/Dialpad';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import DialpadPin from 'components/Dialpad/DialpadPin';
import {RootStackScreenProps} from 'typings/navigation';
import {Header, RgText} from 'components/_ui/typography';

const CreatePasscode = ({
  navigation,
}: RootStackScreenProps<'createPasscode'>) => {
  const [code, setCode] = useState<number[]>([]);

  const onComplete = (codes: number[]) => {
    navigation.navigate('confirmPasscode', {codes});
  };

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={{gap: 6}}>
          <Header>Create passcode</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Set a 6-digit passcode to unlock your wallet
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

export default CreatePasscode;
