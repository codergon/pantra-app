import NFTItem from './NFTItem';
import {colors} from 'utils/Theming';
import {Ghost} from 'phosphor-react-native';
import {Text} from 'components/_ui/typography';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAccountData} from 'providers/AccountDataProvider';

const NFTs = () => {
  const {acctNfts} = useAccountData();

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <FlatList
        numColumns={2}
        data={acctNfts?.data?.ownedNfts}
        ListHeaderComponent={() => {
          return (
            <View style={styles.header}>
              <View
                style={[
                  styles.headerIcon,
                  {backgroundColor: colors.secondary},
                ]}>
                <Ghost color="#fff" size={20} />
              </View>

              <Text style={{fontSize: 18}}>
                Collections • {acctNfts?.data?.totalCount}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <NFTItem nft={item} />}
        ItemSeparatorComponent={() => <View style={{height: 16}} />}
        contentContainerStyle={{paddingTop: 16, paddingBottom: 46}}
      />
    </View>
  );
};

export default NFTs;

const styles = StyleSheet.create({
  header: {
    gap: 10,
    paddingTop: 2,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
