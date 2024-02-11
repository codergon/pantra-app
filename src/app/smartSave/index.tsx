import {useMemo, useRef, useState} from 'react';
import {isAddress} from 'viem';
import {styles} from './styles';
import {colors} from 'utils/Theming';
import {Container} from 'components/_ui/custom';
import FastImage from 'react-native-fast-image';
import {useWallet} from 'providers/WalletProvider';
import {BdText, Input, Text} from 'components/_ui/typography';
import {useSettings} from 'providers/SettingsProvider';
import SavingsToggleBtn from '../../components/smartSave/savingsToggleBtn';
import WithdrawalInterval from 'components/smartSave/withdrawalInterval';
import TokenIcons from 'components/shared/tokenIcons';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import CircleSpinner from 'components/_common/spinner/CircleSpinner';

const SmartSave = () => {
  const inputRef = useRef<TextInput>(null);

  const {activeCurrency} = useSettings();
  const {
    ethPrices,
    smartSavings,
    withdrawSavings,
    getSavingsWallet,
    getSavingsBalance,
    withdrawFromSavings,
  } = useWallet();

  const [amount, setAmount] = useState('');

  const amountInCurrency = useMemo(() => {
    const amt = isNaN(Number(amount)) ? 0 : Number(amount);
    return Number(amt) * (ethPrices[activeCurrency?.slug] || 0);
  }, [amount]);

  const savingsBalance = useMemo(() => {
    const bal = !isNaN(Number(getSavingsBalance?.data))
      ? Number(getSavingsBalance?.data)
      : 0;
    const balance = bal / 1e18;
    const price = Number(ethPrices?.[activeCurrency?.slug]);

    return [balance * (isNaN(price) ? 0 : price), balance];
  }, [getSavingsBalance]);

  const canWithdraw = useMemo(() => {
    return savingsBalance[1] > 0 && isAddress(getSavingsWallet?.data as string);
  }, [savingsBalance]);

  const isValidAmount = useMemo(
    () => Number(amount) <= savingsBalance[1] && Number(amount) > 0,
    [amount],
  );

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
                {savingsBalance[0].toFixed(2)}{' '}
              </BdText>
            )}
          </View>
        </FastImage>
      </View>

      <View style={[styles.content]}>
        <SavingsToggleBtn />

        {isAddress(getSavingsWallet?.data as string) && smartSavings && (
          <WithdrawalInterval />
        )}

        {canWithdraw && (
          <>
            <View style={[styles.addrBlockContainer]}>
              <View style={[styles.addrBlock]}>
                <View style={[styles.icon]}>
                  <TokenIcons size={42} label={'eth'} />
                </View>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    inputRef.current?.focus();
                  }}
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <Input
                    value={amount}
                    innerRef={inputRef}
                    color={colors?.white}
                    keyboardType="numeric"
                    placeholder={'Amount'}
                    onChangeText={setAmount}
                    style={[
                      styles.addressInput,
                      {
                        height: 34,
                        paddingBottom: 5,
                      },
                    ]}
                    placeholderTextColor={colors?.subText1}
                  />

                  <Text style={[styles.addrBlockText_balance]}>
                    {activeCurrency?.symbol}
                    {amountInCurrency?.toFixed(2)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    setAmount(savingsBalance[1].toString());
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: colors?.warning + '42',
                    backgroundColor: colors?.warning + '22',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 14,
                      color: colors?.warning,
                    }}>
                    Max
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{width: '100%'}}>
                <AcceptRejectButton
                  flex={0}
                  accept={true}
                  title={'Withdraw'}
                  disabled={!isValidAmount || withdrawFromSavings?.isLoading}
                  onPress={() => {
                    withdrawSavings({amount: amount});
                  }}>
                  {withdrawFromSavings?.isLoading && (
                    <View
                      style={{
                        right: 16,
                        position: 'absolute',
                      }}>
                      <CircleSpinner
                        size={19}
                        color="#000"
                        thickness={1.6}
                        animating={true}
                        strokeCap="round"
                        unfilledColor="#888"
                      />
                    </View>
                  )}
                </AcceptRejectButton>
              </View>
            </View>
          </>
        )}
      </View>
    </Container>
  );
};

export default SmartSave;
