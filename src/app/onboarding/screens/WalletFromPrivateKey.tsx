import styles from '../styles';
import {useEffect, useState} from 'react';
import {colors} from 'utils/Theming';
import {useWallet} from 'providers/WalletProvider';
import {LockKey} from 'phosphor-react-native';
import BackBtn from 'components/_common/backBtn';
import {AppStackScreenProps} from 'typings/navigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import CircleSpinner from 'components/_common/spinner/CircleSpinner';
import {Header, Input, RgText, Text} from 'components/_ui/typography';
import {
  View,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

const WalletFromPrivateKey = ({
  navigation,
}: AppStackScreenProps<'walletFromPrivateKey'>) => {
  const insets = useSafeAreaInsets();
  const [privateKey, setPrivateKey] = useState<string>('');
  const {isAddingWallet, createSmartWallet, account} = useWallet();

  useEffect(() => {
    if (account) navigation.replace('Main');
  }, [account]);

  return (
    <>
      <ScrollView
        bounces={false}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          {
            flex: 1,
            paddingHorizontal: 18,
            paddingTop: insets.top + 10,
            paddingBottom: insets.bottom + 12,
          },
        ]}>
        <KeyboardAvoidingView behavior="padding" style={[styles.container]}>
          <View style={[styles.header]}>
            <BackBtn />

            <View style={{gap: 6}}>
              <Header>
                Restore wallet from{'\n'}
                <Text style={{color: colors.primary}}>Private Key</Text>
              </Header>
              <RgText style={[{fontSize: 14, color: colors.subText}]}>
                Enter the private key for your wallet
              </RgText>
            </View>
          </View>

          <View style={[styles.content]}>
            <View style={[styles.input_container]}>
              <Input
                multiline
                autoFocus
                value={privateKey}
                style={[styles.input]}
                placeholder="64-character private key"
                onChangeText={text => setPrivateKey(text)}
              />
            </View>
          </View>

          <View style={[styles.footer]}>
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut.duration(100)}
              style={[styles.info_block]}>
              <View
                style={{
                  gap: 4,
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <RgText
                  style={[styles.actionBtn__Text, {color: colors?.warning}]}>
                  Your keys are stored locally
                </RgText>
                <RgText style={[styles.actionBtn__Text__Description]}>
                  Remember that your keys are stored locally on your device and
                  we don't store them anywhere.
                </RgText>
              </View>

              <View
                style={[
                  styles.actionBtn__Icon,
                  {
                    backgroundColor: colors.warning + '20',
                  },
                ]}>
                <LockKey weight="fill" size={16} color={colors.warning} />
              </View>
            </Animated.View>

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!privateKey || isAddingWallet}
              onPress={() => {
                Keyboard.dismiss();
                createSmartWallet({
                  type: 'privateKey',
                  privateKey,
                });
              }}
              style={[
                styles.connectBtn,
                {
                  opacity: privateKey ? 1 : 0.7,
                },
              ]}>
              <Text
                style={[
                  {
                    fontSize: 14,
                    color: '#000',
                  },
                ]}>
                Restore wallet
              </Text>

              {isAddingWallet && (
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
                    unfilledColor="#ddd"
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default WalletFromPrivateKey;
