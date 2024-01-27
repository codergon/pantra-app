import {styles} from './styles';
import Currency from './currency';
import {colors} from 'utils/Theming';
import {ScrollView, View} from 'react-native';
import currencies from 'constants/currencies';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {Header, RgText} from 'components/_ui/typography';
import {SettingsStackScreenProps} from 'typings/navigation';
import {useAccountData} from 'providers/AccountDataProvider';

const Currencies = ({}: SettingsStackScreenProps<'currencies'>) => {
  const {activeCurrency} = useAccountData();

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={{gap: 6}}>
          <Header>Currency</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Current: {activeCurrency?.name} ({activeCurrency?.symbol})
          </RgText>
        </View>
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
