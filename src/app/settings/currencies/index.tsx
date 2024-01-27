import {styles} from './styles';
import Currency from './currency';
import {ScrollView, View} from 'react-native';
import currencies from 'constants/currencies';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {BdText} from 'components/_ui/typography';
import {SettingsStackScreenProps} from 'typings/navigation';

const Currencies = ({}: SettingsStackScreenProps<'currencies'>) => {
  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={{paddingHorizontal: 18}}>
        <BackBtn />
      </View>

      <View style={[styles.header]}>
        <BdText style={{fontSize: 22}}>Currency</BdText>
      </View>

      <ScrollView contentContainerStyle={[styles.settings]}>
        {currencies?.map((currency, i) => {
          return <Currency key={i} currency={currency} />;
        })}
      </ScrollView>
    </Container>
  );
};

export default Currencies;
