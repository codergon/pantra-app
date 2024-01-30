import styles from '../styles';
import {useEffect, useState} from 'react';
import {colors} from 'utils/Theming';
import {useWallet} from 'providers/WalletProvider';
import {LockKey} from 'phosphor-react-native';
import BackBtn from 'components/_common/backBtn';
import {AppStackScreenProps} from 'typings/navigation';
import {useKeyboardVisible} from 'hooks/useKeyboardVisible';
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

const WalletFromMnemonic = ({
  navigation,
}: AppStackScreenProps<'walletFromMnemonic'>) => {
  const insets = useSafeAreaInsets();
  const isKeyboardVisible = useKeyboardVisible();
  const [mnemonic, setMnemonic] = useState<string>('');
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
                <Text style={{color: colors.primary}}>Mnemonic</Text>
              </Header>
              <RgText style={[{fontSize: 14, color: colors.subText}]}>
                This is a 12-word phrase attached to your wallet.
              </RgText>
            </View>
          </View>

          <View style={[styles.content]}>
            <View style={[styles.input_container]}>
              <Input
                multiline
                autoFocus
                value={mnemonic}
                style={[styles.input]}
                placeholder="12-word recovery phrase"
                onChangeText={text => setMnemonic(text)}
              />
            </View>
          </View>

          <View style={[styles.footer]}>
            {!isKeyboardVisible ? (
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
                    Remember that your keys are stored locally on your device
                    and we don't store them anywhere.
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
            ) : (
              <View />
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!mnemonic || isAddingWallet}
              onPress={() => {
                Keyboard.dismiss();
                createSmartWallet({
                  mnemonic,
                  type: 'mnemonic',
                });
              }}
              style={[
                styles.connectBtn,
                {
                  opacity: mnemonic ? 1 : 0.7,
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

export default WalletFromMnemonic;
