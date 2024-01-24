import {colors} from 'utils/Theming';
import {OwnedNft} from 'alchemy-sdk';
import layout from 'constants/layout';
import {formatIpfsLink} from 'helpers/common';
import FastImage from 'react-native-fast-image';
import {RgText} from 'components/_ui/typography';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface NFTItemProps {
  nft: OwnedNft;
}

const NFTItem = ({nft}: NFTItemProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NFTpreview', nft);
      }}
      activeOpacity={0.6}
      style={[
        styles.container,
        {
          borderColor: colors.border3,
        },
      ]}>
      <View style={[styles.nft_image]}>
        {nft?.image?.thumbnailUrl ||
        nft?.contract?.openSeaMetadata?.imageUrl ? (
          <FastImage
            source={{
              uri: formatIpfsLink(
                nft?.image?.thumbnailUrl ||
                  nft?.contract?.openSeaMetadata?.imageUrl +
                    (nft?.contract?.openSeaMetadata?.imageUrl?.slice(-3) ===
                    's60'
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

      <View style={[styles.nft_info]}>
        <RgText style={[styles.nft_name]} numberOfLines={1}>
          {nft?.name ?? nft?.collection?.name}
        </RgText>
      </View>
    </TouchableOpacity>
  );
};

export default NFTItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 6,
    flexDirection: 'column',
    borderColor: colors.border1,
    backgroundColor: colors.accent18,
    maxWidth: (layout.width - 20) / 2 - 12,
  },
  nft_image: {
    width: '100%',
    aspectRatio: 1.1,
    overflow: 'hidden',
    backgroundColor: colors.accent0,
  },
  nft_info: {
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  nft_name: {
    fontSize: 13,
  },
});
