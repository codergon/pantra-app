import {styles} from './styles';
import {colors} from 'utils/Theming';
import {Copy, X} from 'phosphor-react-native';
import {truncate} from 'utils/HelperUtils';
import useClipboard from 'hooks/useClipboard';
import {Text} from 'components/_ui/typography';
import {useBottomSheet} from '@gorhom/bottom-sheet';
import {TouchableOpacity, View} from 'react-native';
import {BottomSheetParams} from 'typings/navigation';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

const PassphraseModal = ({
  route,
}: BottomSheetScreenProps<BottomSheetParams, 'viewPassphrase'>) => {
  const {wallet} = route.params;
  const {close} = useBottomSheet();
  const [copied, CopyToClipboard] = useClipboard();

  const words = wallet?.mnemonic?.phrase?.split(' ');
  const wordsGroup1 = words?.slice(0, 6);
  const wordsGroup2 = words?.slice(6, 12);

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={{flexDirection: 'column', gap: 2}}>
          <Text style={[{fontSize: 18}]}>
            {/*  */}
            Passphrase
          </Text>
          <Text style={[{fontSize: 14, color: colors.subText1}]}>
            {wallet?.name || truncate(wallet?.address, 12)}
          </Text>
        </View>

        <TouchableOpacity onPress={() => close()} style={[styles.closeBtn]}>
          <X size={16} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={{gap: 17, flex: 1}}>
        <View style={[styles.passphrase]}>
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
        </View>
      </View>

      <View style={[styles.actionBtns]}>
        <AcceptRejectButton
          accept={true}
          title={'Copy Passphrase'}
          onPress={() => {
            CopyToClipboard(wallet?.mnemonic?.phrase);
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
