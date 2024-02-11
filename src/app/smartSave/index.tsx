import {useMemo} from 'react';
import {isAddress} from 'viem';
import {styles} from './styles';
import {ActivityIndicator, View} from 'react-native';
import {colors} from 'utils/Theming';
import {Container} from 'components/_ui/custom';
import FastImage from 'react-native-fast-image';
import {useWallet} from 'providers/WalletProvider';
import {BdText, Text} from 'components/_ui/typography';
import {useSettings} from 'providers/SettingsProvider';
import SavingsToggleBtn from '../../components/smartSave/savingsToggleBtn';
import WithdrawalInterval from 'components/smartSave/withdrawalInterval';

const SmartSave = () => {
  const {activeCurrency} = useSettings();
  const {getSavingsWallet, getSavingsBalance, ethPrices} = useWallet();

  const savingsBalance = useMemo(() => {
    const bal = !isNaN(Number(getSavingsBalance?.data))
      ? Number(getSavingsBalance?.data)
      : 0;
    const balance = bal / 1e18;
    const price = Number(ethPrices?.[activeCurrency?.slug]);

    return balance * (isNaN(price) ? 0 : price);
  }, [getSavingsBalance]);

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={{fontSize: 30}}>Smart savings</Text>
        <Text style={{fontSize: 16, color: colors.subText1, lineHeight: 24}}>
          Automatically save fractions of your transactions
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
            {getSavingsBalance?.isLoading ? (
              <ActivityIndicator size="large" color={colors.subText} />
            ) : (
              <BdText style={{fontSize: 40}}>
                {activeCurrency?.symbol}
                {savingsBalance.toFixed(2)}{' '}
              </BdText>
            )}
          </View>
        </FastImage>
      </View>

      <View style={[styles.content]}>
        <SavingsToggleBtn />
      </View>

      {isAddress(getSavingsWallet?.data as string) && <WithdrawalInterval />}
    </Container>
  );
};

export default SmartSave;
