import {useState} from 'react';
import {padding} from 'helpers/styles';
import Image from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'components/_ui/themed';
import {useNavigation} from '@react-navigation/native';
import {RgText, Text} from 'components/_ui/typography';
import {ChevronDown, Copy, Scan} from 'lucide-react-native';
import {EyeSlash, ArrowUpRight, ArrowDownLeft} from 'phosphor-react-native';
import {
  Menu,
  renderers,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const HomeHeader = () => {
  const navigation = useNavigation();
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <View
      style={[
        styles.header,
        {
          borderColor: '#333',
        },
      ]}>
      <View style={[styles.row]}>
        <Menu
          renderer={renderers.Popover}
          rendererProps={{
            placement: 'bottom',
          }}>
          <MenuTrigger
            customStyles={{
              triggerTouchable: {
                activeOpacity: 0.6,
                underlayColor: 'transparent',
              },
            }}>
            <View style={[styles.account]}>
              <View style={[styles.avatar]}>
                <Image
                  resizeMode={Image.resizeMode.cover}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{
                    uri: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Annie&accessories=glasses4,glasses5,sunglasses,sunglasses2&accessoriesProbability=100&facialHairProbability=0&skinColor=d08b5b&backgroundColor=ffdfbf',
                  }}
                />
              </View>
              <Text style={{fontSize: 14}}>{'alphaknight'}</Text>
              <ChevronDown size={17} color="#000" strokeWidth={2.6} />
            </View>
          </MenuTrigger>

          <MenuOptions
            optionsContainerStyle={{
              shadowOffset: {
                width: 0,
                height: 0,
              },
              marginTop: 4,
              elevation: 0,
              borderWidth: 1,
              maxHeight: 270,
              borderRadius: 14,
              borderColor: '#ccc',
              backgroundColor: '#fff',
              shadowColor: 'transparent',
            }}
            customStyles={{
              optionsWrapper: {
                borderRadius: 14,
                overflow: 'hidden',
              },
            }}>
            <MenuOption
              onSelect={() => {
                // disconnect();
              }}
              customStyles={{
                optionWrapper: {
                  paddingVertical: 12,
                  borderBottomWidth: 0,
                  paddingHorizontal: 14,
                  borderColor: '#e4e4e4',
                },
              }}>
              <Text>Disconnect Wallet</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>

        <View
          style={{
            gap: 8,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={[styles.actionBtn]} onPress={() => {}}>
            <Copy size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn]} onPress={() => {}}>
            <Scan size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.row]}>
        <View style={[styles.acct_balance]}>
          <RgText style={[{fontSize: 14, color: '#999'}]}>Your balance</RgText>

          <View style={[styles.balance_info]}>
            <RgText
              style={[
                {
                  marginBottom: hideBalance ? -11 : 0,
                  fontSize: hideBalance ? 34 : 24,
                },
              ]}>
              {hideBalance ? '*****' : '213.3876 ETH'}
            </RgText>

            <TouchableOpacity
              style={{
                display: 'none',
                ...padding(4, 2),
              }}
              onPressIn={() => {
                setHideBalance(p => !p);
              }}>
              <EyeSlash size={18} color="#fff" weight="fill" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            gap: 16,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                width: 38,
                // backgroundColor: "#282828",
                backgroundColor: '#E3DECA',
              },
            ]}
            onPress={() => {}}>
            <ArrowUpRight weight="bold" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionBtn,
              {
                width: 38,
                backgroundColor: '#E3DECA',
              },
            ]}
            onPress={() => {
              navigation.navigate('selectAvatar');
            }}>
            <ArrowDownLeft weight="bold" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    gap: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    flexDirection: 'column',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  column_center: {
    alignItems: 'center',
    flexDirection: 'column',
  },

  account: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 24,
    height: 24,
    marginRight: 4,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },

  actionBtn: {
    width: 36,
    aspectRatio: 1,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  acct_balance: {
    gap: 4,
    flexDirection: 'column',
  },
  balance_info: {
    gap: 4,
    width: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
