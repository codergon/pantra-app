import {styles} from './styles';
import {useState} from 'react';
import {colors} from 'utils/Theming';
import {X} from 'phosphor-react-native';
import {truncate} from 'utils/HelperUtils';
import {Text} from 'components/_ui/typography';
import {useWallet} from 'providers/WalletProvider';
import {BottomSheetParams} from 'typings/navigation';
import WalletIcon from 'components/shared/WalletIcon';
import {useSettings} from 'providers/SettingsProvider';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';
import {BottomSheetTextInput, useBottomSheet} from '@gorhom/bottom-sheet';
import {BottomSheetScreenProps} from '@th3rdwave/react-navigation-bottom-sheet';

const EditWalletModal = ({
  route,
}: BottomSheetScreenProps<BottomSheetParams, 'editWallet'>) => {
  const {close} = useBottomSheet();
  const {updateAccount, account: wallet} = useWallet();
  const {useJazzicons, updateSettings} = useSettings();
  const [walletName, setWalletName] = useState(wallet?.name);
  const [selectedIconType, setSelectedIconType] = useState(
    useJazzicons ? 0 : 1,
  );

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={{flexDirection: 'column', gap: 2}}>
          <Text style={[{fontSize: 18}]}>{wallet?.name || 'Main Wallet'}</Text>
          <Text style={[{fontSize: 14, color: colors.subText1}]}>
            {truncate(wallet?.address, 14)}
          </Text>
        </View>

        <TouchableOpacity onPress={() => close()} style={[styles.closeBtn]}>
          <X size={16} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={{gap: 17, flex: 1}}>
        <BottomSheetTextInput
          value={walletName}
          style={styles.input}
          placeholder="Wallet Name"
          onChangeText={setWalletName}
          placeholderTextColor={colors.subText}
        />

        <View style={styles.selectIconType}>
          {[
            {
              label: 'Jazzicons',
              onPress: () => {},
            },
            {
              label: 'Blockies',
              onPress: () => {},
            },
          ].map((btn, i) => {
            return (
              <View key={i} style={styles.iconTypeContainer}>
                <TouchableOpacity
                  onPress={() => setSelectedIconType(i)}
                  style={[
                    styles.iconType,
                    {
                      borderColor:
                        selectedIconType === i ? colors.primary : 'transparent',
                    },
                  ]}>
                  <WalletIcon
                    size={38}
                    jazzicon={i === 0}
                    address={wallet?.address}
                  />
                </TouchableOpacity>

                <Text style={{fontSize: 17}}>{btn.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={[styles.actionBtns]}>
        <AcceptRejectButton
          accept={true}
          title={'Update Wallet'}
          disabled={
            walletName === wallet?.name &&
            (selectedIconType === 0) === useJazzicons
          }
          onPress={() => {
            Keyboard.dismiss();
            if ((selectedIconType === 0) !== useJazzicons) {
              updateSettings('useJazzicons', selectedIconType === 0);
            }
            if (walletName?.trim()) updateAccount('name', walletName?.trim());
            close();
          }}
        />
      </View>
    </View>
  );
};

export default EditWalletModal;
