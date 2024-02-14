import millify from 'millify';
import {isAddress} from 'viem';
import {styles} from './styles';
import {useBalance} from 'wagmi';
import {colors} from 'utils/Theming';
import {truncate} from 'utils/HelperUtils';
import {CaretDown} from 'phosphor-react-native';
import {Container} from 'components/_ui/custom';
import {ScanLine, X} from 'lucide-react-native';
import BackBtn from 'components/_common/backBtn';
import {useWallet} from 'providers/WalletProvider';
import WalletIcon from 'components/shared/WalletIcon';
import TokenIcons from 'components/shared/tokenIcons';
import {RootStackScreenProps} from 'typings/navigation';
import {useAccountData} from 'providers/AccountDataProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import {Header, Input, RgText, Text} from 'components/_ui/typography';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';

const SendETH = ({route, navigation}: RootStackScreenProps<'sendETH'>) => {
  const scannedAddress = route.params?.toAddress;

  const insets = useSafeAreaInsets();
  const {ethPrices, activeCurrency} = useAccountData();
  const {account, sendETH, curretGasPrice} = useWallet();
  const {data: ethBalance} = useBalance({
    formatUnits: 'ether',
    address: account?.address!,
  });

  const inputRef = useRef<TextInput>(null);
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const isValidAddress = useMemo(() => isAddress(toAddress), [toAddress]);

  useEffect(() => {
    // Set the scanned address as the toAddress
    if (scannedAddress) {
      setToAddress(scannedAddress);
      // reset the scanned address
      navigation.setParams({toAddress: undefined});
    }
  }, [scannedAddress]);

  // Amount, Gas and Savings calculations
  const estimatedGas = useMemo(() => {
    const gasprice = Number(curretGasPrice || 0) * 21000;
    const gaspriceInCurrency =
      gasprice * (ethPrices[activeCurrency?.slug] || 0);
    return [gasprice, gaspriceInCurrency];
  }, [curretGasPrice]);

  const amountInCurrency = useMemo(() => {
    const amt = isNaN(Number(amount)) ? 0 : Number(amount);
    return Number(amt) * (ethPrices[activeCurrency?.slug] || 0);
  }, [amount]);

  // Amount to be saved and the next round figure
  const amountSaved = useMemo(() => {
    /* 
      The amount saved is the difference between the amount and the next round figure of the amount eg for $47.83, the amount saved is $2.17
    */
    const roundFigure = Math.ceil(amountInCurrency / 5) * 5;
    const roundFigureEth = roundFigure / (ethPrices[activeCurrency?.slug] || 0);
    const saved = roundFigure - amountInCurrency;
    const savedEth = saved / (ethPrices[activeCurrency?.slug] || 0);
    return [saved, savedEth, roundFigure, roundFigureEth];
  }, [amountInCurrency]);

  const shouldSave = useMemo(() => {
    return amountSaved[3] + estimatedGas[0] <= Number(ethBalance?.formatted);
  }, [amountSaved]);

  const isValidAmount = useMemo(
    () =>
      Number(amount) <= Number(ethBalance?.formatted) - estimatedGas[0] &&
      Number(amount) > 0,
    [amount],
  );

  return (
    <Container
      paddingTop={10}
      style={[styles.container, {paddingBottom: insets.bottom + 20}]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={{gap: 6}}>
          <Header>Send ETH</Header>
          <RgText style={[{fontSize: 14, color: colors.subText1}]}>
            Transfer ETH to another wallet
          </RgText>
        </View>
      </View>

      <ScrollView bounces={false} contentContainerStyle={[styles.body]}>
        <View style={[styles.addrBlocks]}>
          <View style={[styles.addrBlock]}>
            <WalletIcon size={42} address={account?.address!} />

            <View
              style={{
                gap: 3,
                flex: 1,
                flexDirection: 'column',
              }}>
              <Text
                numberOfLines={1}
                style={[styles.addrBlockText, {color: colors?.white}]}>
                {account?.name || 'Main Wallet'}
              </Text>
              <Text style={[styles.addrBlockText_balance]}>
                Balance:{' '}
                {millify(Number(ethBalance?.formatted || 0), {
                  precision: 3,
                })}{' '}
                ETH
              </Text>
            </View>

            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CaretDown size={17} weight="bold" color={colors?.white} />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.addrBlock,
              !isValidAddress && {
                backgroundColor: 'transparent',
              },
            ]}>
            {isValidAddress ? (
              <>
                <WalletIcon size={42} address={toAddress} />

                <View
                  style={{
                    gap: 3,
                    flex: 1,
                    flexDirection: 'column',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={[styles.addrBlockText, {color: colors?.white}]}>
                    {truncate(toAddress, 17)}
                  </Text>
                </View>
              </>
            ) : (
              <Input
                value={toAddress}
                returnKeyType="done"
                color={colors?.white}
                onChangeText={setToAddress}
                style={styles.addressInput}
                placeholderTextColor={colors?.subText1}
                placeholder={'Enter address or scan QR'}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                if (isValidAddress) {
                  setToAddress('');
                } else {
                  navigation.navigate('scanQR', {scanAddress: true});
                }
              }}
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {isValidAddress ? (
                <X size={17} color={colors?.white} />
              ) : (
                <ScanLine size={17} color={colors?.white} />
              )}
            </TouchableOpacity>
          </View>

          <View style={[styles.addrBlock, {backgroundColor: 'transparent'}]}>
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
                setAmount(
                  (
                    Number(ethBalance?.formatted || 0) - estimatedGas[0]
                  ).toFixed(5),
                );
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
                style={{fontSize: 12, lineHeight: 14, color: colors?.warning}}>
                Max
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            gap: 16,
            padding: 14,
            width: '100%',
            borderWidth: 1,
            borderRadius: 16,
            borderStyle: 'dashed',
            borderColor: colors.border4,
          }}>
          {[
            ...(shouldSave
              ? [
                  {
                    label: 'Savings',
                    etherAmount: amountSaved[1],
                    currencyAmount: amountSaved[0],
                  },
                ]
              : []),
            {
              etherAmount: shouldSave
                ? amountSaved[3]
                : isNaN(Number(amount))
                ? 0
                : Number(amount),
              currencyAmount: shouldSave ? amountSaved[2] : amountInCurrency,
              label: `Amount ${shouldSave ? ' + Savings' : ''}`,
            },
            {
              label: 'Estimated Balance',
              etherAmount: estimatedGas[0],
              currencyAmount: estimatedGas[1],
            },
          ].map((item, index, items) => {
            return (
              <Fragment key={index}>
                <View style={[styles.rowItem]}>
                  <Text style={[styles.rowItemLabel]}>{item?.label}</Text>

                  <View style={[styles.currAmt]}>
                    <Text style={{fontSize: 15}}>
                      {item?.etherAmount?.toFixed(
                        index === items.length - 1 ? 8 : 4,
                      )}{' '}
                      ETH
                    </Text>
                    <Text style={{fontSize: 15, color: colors.subText1}}>
                      {activeCurrency?.symbol}
                      {item?.currencyAmount?.toFixed(
                        index === items.length - 1 ? 4 : 2,
                      )}
                    </Text>
                  </View>
                </View>
                {((index === 1 && items?.length == 3) ||
                  (index === 0 && items?.length == 2)) && (
                  <View style={styles.divider} />
                )}
              </Fragment>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AcceptRejectButton
          flex={0}
          accept={true}
          title="Send ETH"
          disabled={!isValidAmount || !isValidAddress}
          onPress={() => {
            sendETH({
              shouldSave,
              amount: amount,
              to: toAddress as `0x${string}`,
              amountSaved: {
                ether: amountSaved[1],
                currency: amountSaved[0],
              },
            });

            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.replace('Main', {screen: 'home'});
            }
          }}
        />
      </View>
    </Container>
  );
};

export default SendETH;
