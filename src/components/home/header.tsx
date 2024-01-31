import {useFeeData} from 'wagmi';
import {colors} from 'utils/Theming';
import Image from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components/_ui/typography';
import {ChevronDown} from 'lucide-react-native';
import {RootTabScreenProps} from 'typings/navigation';
import {TouchableOpacity} from 'components/_ui/themed';
import {Barcode, GasPump} from 'phosphor-react-native';

interface HomeHeaderProps {
  navigation: RootTabScreenProps<'home'>['navigation'];
}

const HomeHeader = ({navigation}: HomeHeaderProps) => {
  const {data: feeData} = useFeeData({formatUnits: 'gwei', watch: true});

  return (
    <View style={[styles.header]}>
      <View style={[styles.row]}>
        <TouchableOpacity
          style={[styles.actionBtn]}
          onPress={() => {
            navigation.navigate('scanQR');
          }}>
          <Barcode size={18} color="#fff" />
        </TouchableOpacity>

        <View style={[styles.gasPrice]}>
          <GasPump size={16} color={colors.primary} weight="fill" />
          <Text style={{fontSize: 13, paddingTop: 1}}>
            {feeData?.formatted?.gasPrice
              ? Number(feeData?.formatted?.gasPrice).toFixed(2)
              : 0}
          </Text>
        </View>
      </View>

      <View style={[styles.account, {}]}>
        <View style={[styles.avatar]}>
          <Image
            resizeMode="cover"
            style={[styles.image]}
            source={{
              uri: 'https://api.dicebear.com/7.x/open-peeps/png?backgroundType=gradientLinear&seed=h&scale=90&radius=50&backgroundColor=ecad80,f2d3b1,b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc,9e5622',
            }}
          />
        </View>
        <Text style={{fontSize: 14.6}}>{"alphaknight's wallet"}</Text>
        <ChevronDown
          size={16}
          color="#fff"
          strokeWidth={1.8}
          style={{marginLeft: 2, marginTop: 1}}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    gap: 20,
    paddingTop: 4,
    marginBottom: 6,
    paddingLeft: 10,
    paddingRight: 20,
    paddingBottom: 4,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  row: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column_center: {
    alignItems: 'center',
    flexDirection: 'column',
  },

  image: {
    width: '100%',
    height: '100%',
  },
  account: {
    gap: 4,
    borderRadius: 40,
    paddingVertical: 4,
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 6.5,
    backgroundColor: colors.accent2,
  },

  avatar: {
    width: 19,
    height: 19,
    marginRight: 4,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.accent,
  },

  gasPrice: {
    gap: 4,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
  },

  actionBtn: {
    padding: 8,
    aspectRatio: 1,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  acct_balance: {
    gap: 4,
    flexDirection: 'column',
  },
});
