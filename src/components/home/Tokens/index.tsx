import TokenItem from './TokenItem';
import {colors} from 'utils/Theming';
import EthBalance from './EthBalance';
import {Wallet} from 'phosphor-react-native';
import {Text} from 'components/_ui/typography';
import EmptyState from 'components/shared/emptyState';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAccountData} from 'providers/AccountDataProvider';

const Tokens = () => {
  const {ERC20Tokens, activeCurrency, acctBalance} = useAccountData();
  const balance = Number(acctBalance?.total).toFixed(2).split('.');

  return (
    <View style={{flex: 1, paddingHorizontal: 18}}>
      <FlatList
        ListEmptyComponent={() => {
          return (
            <>
              <EmptyState
                isLoading={ERC20Tokens?.isLoading}
                data={{
                  message: '',
                  loadingText: 'Fetching tokens...',
                }}
              />
            </>
          );
        }}
        data={ERC20Tokens.data}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={styles.header}>
                <View
                  style={[
                    styles.headerIcon,
                    {backgroundColor: colors.secondary},
                  ]}>
                  <Wallet color="#fff" size={20} />
                </View>

                <Text style={{fontSize: 18}}>
                  Wallet • {activeCurrency?.symbol}
                  {balance[0]}
                  {'.'}
                  <Text style={{color: colors.subText2}}>
                    {balance[1] ? balance[1] : '00'}
                  </Text>
                </Text>
              </View>

              <EthBalance />
            </>
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
