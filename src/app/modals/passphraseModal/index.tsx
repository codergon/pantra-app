import {styles} from './styles';
import {colors} from 'utils/Theming';
import {truncate} from 'utils/HelperUtils';
import useClipboard from 'hooks/useClipboard';
import {useWallet} from 'providers/WalletProvider';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import {TouchableOpacity, View} from 'react-native';
import {BottomSheetParams} from 'typings/navigation';
import {Copy, LockKey, X} from 'phosphor-react-native';
import {RgText, Text} from 'components/_ui/typography';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

const PassphraseModal = ({
  route,
}: BottomSheetScreenProps<BottomSheetParams, 'viewPassphrase'>) => {
  const {close} = useBottomSheet();
  const {account: wallet} = useWallet();
  const [copied, CopyToClipboard] = useClipboard();

  const words = wallet?.mnemonic?.split(' ');
  const wordsGroup1 = words?.slice(0, 6) || [];
  const wordsGroup2 = words?.slice(6, 12) || [];

  console.log(wallet?.privateKey);

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={{flexDirection: 'column', gap: 2}}>
          <Text style={[{fontSize: 18}]}>
            {wallet?.mnemonic ? 'Passphrase' : 'Private Key'}
          </Text>
          <Text style={[{fontSize: 14, color: colors.subText1}]}>
            {wallet?.name || truncate(wallet?.address, 15)}
          </Text>
        </View>

        <TouchableOpacity onPress={() => close()} style={[styles.closeBtn]}>
          <X size={16} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={{gap: 17, flex: 1}}>
        <View style={[styles.passphrase]}>
          {wallet?.mnemonic ? (
            <>
              <View style={[styles.group]}>
                {wordsGroup1.map((word, index) => {
                  return (
                    <View key={index} style={styles.word}>
                      <View style={styles.numbering}>
                        <Text style={{fontSize: 16}}>{index + 1}</Text>
                      </View>

                      <Text style={[{fontSize: 16, color: colors.white}]}>
                        {word}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <View style={[styles.group]}>
                {wordsGroup2.map((word, index) => {
                  return (
                    <View key={index} style={styles.word}>
                      <View style={styles.numbering}>
                        <Text style={{fontSize: 16}}>{index + 7}</Text>
                      </View>

                      <Text style={[{fontSize: 16, color: colors.white}]}>
                        {word}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </>
          ) : (
            <>
              <Text style={[{fontSize: 16, color: colors.white}]}>
                {wallet?.privateKey}
              </Text>
            </>
          )}
        </View>

        {wallet?.privateKey && (
          <View style={[styles.info_block]}>
            <View
              style={{
                gap: 4,
                flex: 1,
                flexDirection: 'column',
              }}>
              <RgText style={[styles.actionBtn__Text__Description]}>
                Warning: Never disclose this key. Anyone with your private keys
                can steal any assets held in your account.
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
          </View>
        )}
      </View>

      <View style={[styles.actionBtns]}>
        <AcceptRejectButton
          accept={true}
          title={`Copy ${wallet?.mnemonic ? 'Passphrase' : 'Private Key'}`}
          onPress={() => {
            CopyToClipboard(wallet?.mnemonic || wallet?.privateKey || '');
          }}>
          <Copy
            size={16}
            weight={copied ? 'fill' : 'regular'}
            color={colors[copied ? 'black' : 'black']}
          />
        </AcceptRejectButton>
      </View>
    </View>
  );
};

export default PassphraseModal;
