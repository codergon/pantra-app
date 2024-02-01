import {styles} from './styles';
import {View} from 'react-native';
import {colors} from 'utils/Theming';
import {Container} from 'components/_ui/custom';
import FastImage from 'react-native-fast-image';
import {BdText, Text} from 'components/_ui/typography';
import WithdrawalInterval from 'components/smartSave/withdrawalInterval';
import SavingsToggleBtn from '../../components/smartSave/savingsToggleBtn';

const SmartSave = () => {
  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={{fontSize: 30}}>Smart savings</Text>
        <Text style={{fontSize: 16, color: colors.subText1, lineHeight: 24}}>
          Save money on from your transactions
        </Text>
      </View>

      <View
        style={{
          flex: 0,
          aspectRatio: 1.4,
          borderRadius: 14,
          overflow: 'hidden',
          marginHorizontal: 4,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <FastImage
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          resizeMode={FastImage.resizeMode.cover}
          source={require('assets/images/grads/blur.png')}>
          <View
            style={{
              gap: 14,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20}}>Amount saved</Text>
            <BdText style={{fontSize: 40}}>$400.00</BdText>
          </View>
        </FastImage>
      </View>

      <View style={[styles.content]}>
        <SavingsToggleBtn />
      </View>

      <WithdrawalInterval />
    </Container>
  );
};

export default SmartSave;
