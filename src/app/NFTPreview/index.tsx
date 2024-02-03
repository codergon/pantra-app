import styles from './styles';
import {colors} from 'utils/Theming';
import {formatIpfsLink} from 'helpers/common';
import {Text} from 'components/_ui/typography';
import {Container} from 'components/_ui/custom';
import FastImage from 'react-native-fast-image';
import BackBtn from 'components/_common/backBtn';
import {useWallet} from 'providers/WalletProvider';
import {ArrowSquareOut} from 'phosphor-react-native';
import {RootStackScreenProps} from 'typings/navigation';
import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';

const NFTpreview = ({route}: RootStackScreenProps<'NFTpreview'>) => {
  const nftData = route.params;
  const {account, currentRPC} = useWallet();

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={styles.header_title}>
          <Text style={{color: colors.white}}>Details</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          gap: 24,
          paddingTop: 10,
          paddingBottom: 100,
          paddingHorizontal: 18,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={[styles.content]}>
          <View style={[styles.nft_image]}>
            {nftData?.image_url || nftData?.metadata?.image ? (
              <FastImage
                source={{
                  uri: formatIpfsLink(
                    nftData?.image_url || nftData?.metadata?.image,
                  ),
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={[{width: '100%', height: '100%'}]}
              />
            ) : (
              <>
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  style={[{width: '100%', height: '100%'}]}
                  source={require('assets/images/masks/mask-1.png')}
                />
              </>
            )}
          </View>

          <View style={[styles.collection_details]}>
            <View style={[styles.collection_image]}>
              {nftData?.image_url || nftData?.metadata?.image ? (
                <FastImage
                  source={{
                    uri: formatIpfsLink(
                      nftData?.image_url || nftData?.metadata?.image,
                    ),
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={[{width: '100%', height: '100%'}]}
                />
              ) : (
                <>
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    style={[{width: '100%', height: '100%'}]}
                    source={require('assets/images/masks/mask-1.png')}
                  />
                </>
              )}
            </View>

            <View style={[styles.collection_info]}>
              <Text style={[styles.collection_name]} numberOfLines={1}>
                {nftData?.metadata?.name}
              </Text>
              <Text style={[styles.collection_desc]} numberOfLines={1}>
                #{nftData?.id}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  `https://${currentRPC}/token/${account?.address}/instance/${nftData?.id}`,
                );
              }}
              style={{
                padding: 10,
                marginLeft: 10,
                paddingRight: 5,
              }}>
              <ArrowSquareOut weight="fill" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {nftData?.metadata?.attributes?.length > 0 && (
          <View style={[styles.nft_stats]}>
            <View style={[styles.nft_stat_title]}>
              <Text style={[styles.nft_stat_title_text]}>Attributes</Text>
              <Text
                style={[styles.nft_stat_title_text, {color: colors.subText2}]}>
                {nftData?.metadata?.attributes?.length}
              </Text>
            </View>

            {nftData?.metadata?.attributes?.map((attr, index) => {
              return (
                <View key={index} style={[styles.nft_stat]}>
                  <Text numberOfLines={1} style={[styles.stat_label]}>
                    {attr?.trait_type}
                  </Text>
                  <Text numberOfLines={1} style={[styles.stat_value]}>
                    {attr?.value}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default NFTpreview;
