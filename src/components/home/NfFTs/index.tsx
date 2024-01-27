import {colors} from 'utils/Theming';
import Collection from './Collection';
import {Ghost} from 'phosphor-react-native';
import {Text} from 'components/_ui/typography';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useAccountData} from 'providers/AccountDataProvider';

const NFTs = () => {
  const {nftsCollections} = useAccountData();

  return (
    <View style={{flex: 1, paddingHorizontal: 12}}>
      <ScrollView
        contentContainerStyle={{
          gap: 10,
          paddingTop: 16,
          paddingBottom: 46,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.header}>
          <View
            style={[styles.headerIcon, {backgroundColor: colors.secondary}]}>
            <Ghost color="#fff" size={20} />
          </View>

          <Text style={{fontSize: 18}}>
            Collections • {nftsCollections?.length}
          </Text>
        </View>

        {nftsCollections?.map((collection, index) => {
          return <Collection key={index} collection={collection} />;
        })}
      </ScrollView>
    </View>
  );
};

export default NFTs;

const styles = StyleSheet.create({
  header: {
    gap: 10,
    paddingTop: 4,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
