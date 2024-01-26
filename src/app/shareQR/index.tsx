import {useRef} from 'react';
import {colors} from 'utils/Theming';
import layout from 'constants/layout';
import Share from 'react-native-share';
import {Check} from 'lucide-react-native';
import {truncate} from 'utils/HelperUtils';
import {Copy, X} from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import useClipboard from 'hooks/useClipboard';
import ViewShot from 'react-native-view-shot';
import FullBtn from 'components/shared/fullBtn';
import {useWallet} from 'providers/WalletProvider';
import {RgText, Text} from 'components/_ui/typography';
import {RootStackScreenProps} from 'typings/navigation';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ShareQR = ({navigation}: RootStackScreenProps<'shareQR'>) => {
  const {account} = useWallet();
  const insets = useSafeAreaInsets();
  const viewShotRef = useRef<ViewShot | any>();
  const [copied, copyToClipboard] = useClipboard();
  const qrCodeWidth = Math.max(layout.width * 0.52, 220);

  const handleShare = async () => {
    viewShotRef?.current?.capture().then(async (uri: string) => {
      try {
        const message = `Pantra Wallet\n${truncate(account?.address, 13)}`;

        await Share.open({
          url: uri,
          type: 'image/jpeg',
          title: 'Pantra wallet',
          subject: 'Pantra wallet',
          activityItemSources: [
            {
              item: {},
              linkMetadata: {
                icon: uri,
                title: message,
              },
              placeholderItem: {
                type: 'text',
                content: uri,
              },
            },
          ],
        });

        navigation.goBack();
      } catch (e) {}
    });
  };

  return (
    <View style={[styles.container, {justifyContent: 'flex-end'}]}>
      <View
        style={[
          styles.container,
          {
            paddingBottom: 20,
            backgroundColor: colors.accent0A,
            maxHeight: layout.height - insets.top,
          },
        ]}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.accent21,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.cancelBtn]}
            onPress={() => navigation.goBack()}>
            <X size={22} color={colors.white} strokeWidth={2.1} />
          </TouchableOpacity>
          <Text style={[styles.headerText]}>Share your wallet</Text>
        </View>

        <View
          style={[
            styles.flexView,
            {paddingBottom: insets.bottom + 20, paddingHorizontal: 16},
          ]}>
          <View
            style={[
              styles.flexView,
              {gap: 26, alignItems: 'center', justifyContent: 'center'},
            ]}>
            <ViewShot
              ref={viewShotRef}
              options={{
                quality: 0.9,
                format: 'jpg',
                fileName: 'pantra-wallet_' + account?.address,
              }}
              style={{
                borderWidth: 1,
                aspectRatio: 1,
                borderRadius: 18,
                overflow: 'hidden',
                width: qrCodeWidth,
                borderColor: '#ddd',
                alignItems: 'center',
                backgroundColor: '#fff',
                justifyContent: 'center',
              }}>
              <QRCode
                ecl="M"
                logoSize={64}
                quietZone={15}
                size={qrCodeWidth}
                logoBorderRadius={10}
                value={account?.address}
                logoBackgroundColor="#fff"
                backgroundColor="transparent"
                logo={require('assets/images/icon.png')}
              />
            </ViewShot>

            <View
              style={{
                gap: 10,
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  letterSpacing: 0.2,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}>
                Pantra - {truncate(account?.address, 13)}
              </Text>
              <RgText
                style={{
                  fontSize: 14,
                  maxWidth: 280,
                  lineHeight: 20,
                  textAlign: 'center',
                  color: colors.subText2,
                }}>
                Share your wallet address to receive payments by scanning the QR
                code.
              </RgText>
            </View>
          </View>

          <View style={[styles.btns]}>
            <FullBtn
              gap={8}
              title="Copy Address"
              onPress={() => {
                if (account?.address) copyToClipboard(account?.address);
              }}>
              {copied ? (
                <View
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#419B45',
                  }}>
                  <Check size={9} color={'#fff'} strokeWidth={3} />
                </View>
              ) : (
                <Copy size={13} strokeWidth={2.5} color={'#000'} />
              )}
            </FullBtn>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleShare}
              style={[
                styles.btn,
                {
                  backgroundColor: colors.primary,
                },
              ]}>
              <RgText style={{fontSize: 14, color: '#000'}}>
                Share QR Code
              </RgText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShareQR;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },

  header: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 16,
    letterSpacing: 0.3,
  },
  cancelBtn: {
    top: 0,
    width: 48,
    right: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  flexView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },

  btns: {
    gap: 10,
    width: '100%',
    flexDirection: 'column',
  },
  btn: {
    gap: 10,
    height: 40,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
