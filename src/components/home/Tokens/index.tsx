import TokenItem from './TokenItem';
import {colors} from 'utils/Theming';
import {Wallet} from 'phosphor-react-native';
import {Text} from 'components/_ui/typography';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAccountData} from 'providers/AccountDataProvider';

const Tokens = () => {
  const {acctTokens, usdBalance} = useAccountData();
  const balance = Number(usdBalance?.total).toFixed(2).split('.');

  return (
    <View style={{flex: 1, paddingHorizontal: 18}}>
      <FlatList
        data={acctTokens}
        ListHeaderComponent={() => {
          return (
            <View style={styles.header}>
              <View
                style={[
                  styles.headerIcon,
                  {backgroundColor: colors.secondary},
                ]}>
                <Wallet color="#fff" size={20} />
              </View>

              <Text style={{fontSize: 18}}>
                Wallet • ${balance[0]}
                {'.'}
                <Text style={{color: colors.subText2}}>
                  {balance[1] ? balance[1] : '00'}
                </Text>
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <TokenItem token={item} />}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
        contentContainerStyle={{paddingTop: 16, paddingBottom: 46}}
      />
    </View>
  );
};

export default Tokens;

const styles = StyleSheet.create({
  header: {
    gap: 10,
    paddingTop: 4,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
