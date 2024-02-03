import NFTItem from './NFTItem';
import {colors} from 'utils/Theming';
import {INFTItem} from 'typings/common';
import {formatIpfsLink} from 'helpers/common';
import {Text} from 'components/_ui/typography';
import {CaretDown} from 'phosphor-react-native';
import FastImage from 'react-native-fast-image';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  measure,
  runOnUI,
  withTiming,
  useAnimatedRef,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface TxnDataProps {
  collection: INFTItem;
}

const Collection = ({collection}: TxnDataProps) => {
  const open = useSharedValue(false);
  const contentHeight = useSharedValue(0);
  const contentRef = useAnimatedRef<Animated.View>();
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: progress.value * 180 + 'deg'}],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    height: contentHeight.value,
  }));

  return (
    <>
      <View style={[styles.collection]}>
        <TouchableOpacity
          onPress={() => {
            if (contentHeight.value === 0) {
              runOnUI(() => {
                'worklet';
                contentHeight.value = withTiming(measure(contentRef)!.height);
              })();
            } else {
              contentHeight.value = withTiming(0);
            }
            open.value = !open.value;
          }}
          style={[styles.collection_header]}>
          <View style={styles.collection_header_label}>
            <View style={[styles.collection_image]}>
              {collection?.token.icon_url ||
              collection?.token_instances?.[0]?.image_url ? (
                <FastImage
                  source={{
                    uri: formatIpfsLink(
                      collection?.token.icon_url ||
                        collection?.token_instances?.[0]?.image_url,
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

            <View
              style={{
                gap: 2,
                flexDirection: 'column',
              }}>
              <Text style={{fontSize: 15}} numberOfLines={1}>
                {collection?.token?.name}
              </Text>
              <Text style={{fontSize: 13, color: colors.subText2}}>
                NFTS: {collection?.amount}
              </Text>
            </View>
          </View>

          <Animated.View style={[animatedStyle]}>
            <CaretDown size={15} color={colors.white} weight="bold" />
          </Animated.View>
        </TouchableOpacity>

        <Animated.View style={[contentAnimatedStyle, {width: '100%'}]}>
          <Animated.View ref={contentRef} style={[styles.collection_content]}>
            {collection?.token_instances?.map((nft, i) => {
              return <NFTItem key={i} nft={nft} />;
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </>
  );
};

export default Collection;

const styles = StyleSheet.create({
  collection: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'column',
  },

  collection_image: {
    width: 26,
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: colors.accent2,
  },

  collection_header: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  collection_header_label: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collection_content: {
    top: 0,
    left: 0,
    width: '100%',
    paddingTop: 0,
    paddingBottom: 8,
    flexWrap: 'wrap',
    position: 'absolute',
    flexDirection: 'row',
    borderTopColor: colors.accent4,
  },
});
