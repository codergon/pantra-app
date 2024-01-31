import millify from 'millify';
import styles from './styles';
import {colors} from 'utils/Theming';
import {formatIpfsLink} from 'helpers/common';
import {Container} from 'components/_ui/custom';
import FastImage from 'react-native-fast-image';
import BackBtn from 'components/_common/backBtn';
import {ArrowSquareOut} from 'phosphor-react-native';
import {RgText, Text} from 'components/_ui/typography';
import {RootStackScreenProps} from 'typings/navigation';
import {Linking, TouchableOpacity, View} from 'react-native';
import {useAccountData} from 'providers/AccountDataProvider';

const NFTpreview = ({route}: RootStackScreenProps<'NFTpreview'>) => {
  const nftData = route.params;
  const {ethPrices, activeCurrency} = useAccountData();

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={styles.header_title}>
          <Text style={{color: colors.white}}>Details</Text>
        </View>
      </View>

      <View style={[styles.content]}>
        <View style={[styles.nft_image]}>
          {nftData?.image?.thumbnailUrl ||
          nftData?.contract?.openSeaMetadata?.imageUrl ? (
            <FastImage
              source={{
                uri: formatIpfsLink(
                  nftData?.image?.thumbnailUrl ||
                    nftData?.contract?.openSeaMetadata?.imageUrl +
                      (nftData?.contract?.openSeaMetadata?.imageUrl?.slice(
                        -3,
                      ) === 's60'
                        ? '0'
                        : ''),
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
                source={require('assets/images/masks/mask-2.png')}
              />
            </>
          )}
        </View>

        <View style={[styles.collection_details]}>
          <View style={[styles.collection_image]}>
            <FastImage
              source={{
                uri: formatIpfsLink(
                  nftData?.contract?.openSeaMetadata?.imageUrl,
                ),
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={[{width: '100%', height: '100%'}]}
            />
          </View>

          <View style={[styles.collection_info]}>
            <Text style={[styles.collection_name]} numberOfLines={1}>
              {nftData?.collection?.name}
            </Text>
            <RgText style={[styles.collection_desc]} numberOfLines={1}>
              {nftData?.name}
            </RgText>
          </View>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://opensea.io/assets/' +
                  nftData?.contract?.address +
                  '/' +
                  nftData?.tokenId,
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

      <RgText numberOfLines={4} style={{color: colors.subText3}}>
        {nftData?.description}
      </RgText>

      {nftData?.contract?.openSeaMetadata?.floorPrice && (
        <View style={[styles.nft_stats]}>
          <View style={[styles.nft_stat]}>
            <Text style={[styles.stat_label]}>
              {nftData?.contract?.openSeaMetadata?.floorPrice}
              {' ETH '}
            </Text>
            <Text style={[styles.stat_value]}>
              ({activeCurrency?.symbol}
              {millify(
                Number(nftData?.contract?.openSeaMetadata?.floorPrice) *
                  ethPrices[activeCurrency?.slug],
                {precision: 2},
              )}
              )
            </Text>
          </View>
        </View>
      )}
    </Container>
  );
};

export default NFTpreview;
