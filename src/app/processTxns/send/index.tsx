import millify from 'millify';
import {isAddress} from 'viem';
import {styles} from './styles';
import {colors} from 'utils/Theming';
import {truncate} from 'utils/HelperUtils';
import {useBalance, useFeeData} from 'wagmi';
import {ScanLine, X} from 'lucide-react-native';
import {CaretDown} from 'phosphor-react-native';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {useEffect, useMemo, useState} from 'react';
import {useWallet} from 'providers/WalletProvider';
import WalletIcon from 'components/shared/WalletIcon';
import TokenIcons from 'components/shared/tokenIcons';
import {RootStackScreenProps} from 'typings/navigation';
import {useAccountData} from 'providers/AccountDataProvider';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header, Input, RgText, Text} from 'components/_ui/typography';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';

const SendETH = ({route, navigation}: RootStackScreenProps<'sendETH'>) => {
  const insets = useSafeAreaInsets();
  const {account, sendETH} = useWallet();
  const scannedAddress = route.params?.toAddress;
  const {ethPrices, activeCurrency} = useAccountData();
  const {data: ethBalance} = useBalance({
    formatUnits: 'ether',
    address: account?.address! as `0x${string}`,
  });
  const {data: feeData} = useFeeData({formatUnits: 'ether', watch: true});

  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const isValidAddress = useMemo(() => isAddress(toAddress), [toAddress]);
  const isValidAmount = useMemo(
    () =>
      Number(amount) <=
      Number(ethBalance?.formatted) -
        Number(feeData?.formatted?.gasPrice || 0) * 21000,
    [amount],
  );

  useEffect(() => {
    // Set the scanned address as the toAddress
    if (scannedAddress) {
      setToAddress(scannedAddress);
      // reset the scanned address
      navigation.setParams({toAddress: undefined});
    }
  }, [scannedAddress]);

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
            <WalletIcon size={42} addres={account?.address!} />

            <View
              style={{
                gap: 3,
                flex: 1,
                flexDirection: 'column',
              }}>
              <Text
                numberOfLines={1}
                style={[styles.addrBlockText, {color: colors?.white}]}>
                alphaglitch.eth
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
                <WalletIcon size={42} addres={toAddress} />

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

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Input
                value={amount}
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
                {Number(
                  Number(amount || 0) * (ethPrices[activeCurrency?.slug] || 0),
                )?.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setAmount(
                  (
                    Number(ethBalance?.formatted || 0) -
                    Number(feeData?.formatted?.gasPrice || 0) * 21000
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

        <View style={styles.divider} />

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 17}}>
              Gas{' '}
              <Text style={{color: colors.subText, fontStyle: 'italic'}}>
                (estimated)
              </Text>
            </Text>

            <View
              style={{gap: 2, flexDirection: 'column', alignItems: 'flex-end'}}>
              <Text style={{fontSize: 17}}>
                {(Number(feeData?.formatted?.gasPrice || 0) * 21000).toFixed(8)}{' '}
                ETH
              </Text>
              <Text style={{fontSize: 17, color: colors.subText1}}>
                {activeCurrency?.symbol}{' '}
                {(
                  Number(feeData?.formatted?.gasPrice || 0) *
                  21000 *
                  (ethPrices[activeCurrency?.slug] || 0)
                ).toFixed(4)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.body}>
        <AcceptRejectButton
          flex={0}
          accept={true}
          title="Send ETH"
          disabled={!isValidAmount || !isValidAddress}
          onPress={() => {
            sendETH({
              to: toAddress,
              amount: amount,
            });
            navigation.replace('Main', {screen: 'home'});
          }}
        />
      </View>
    </Container>
  );
};

export default SendETH;
