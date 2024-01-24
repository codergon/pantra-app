import {Text} from 'components/_ui/typography';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAccountData} from 'providers/AccountDataProvider';
import TokenItem from './TokenItem';

const Tokens = () => {
  const {acctTokens} = useAccountData();

  return (
    <View style={{flex: 1, paddingHorizontal: 18}}>
      <FlatList
        data={acctTokens}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <TokenItem token={item} />}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
        contentContainerStyle={{paddingTop: 16, paddingBottom: 16}}
      />
    </View>
  );
};

export default Tokens;

const styles = StyleSheet.create({});
