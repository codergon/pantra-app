import {colors} from 'utils/Theming';
import {CaretDown, Note} from 'phosphor-react-native';
import {RgText, Text} from 'components/_ui/typography';
import {ICollection} from 'providers/AccountDataProvider';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Animated, {
  measure,
  runOnUI,
  withTiming,
  useAnimatedRef,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import NFTItem from './NFTItem';
import FastImage from 'react-native-fast-image';
import {formatIpfsLink} from 'helpers/common';

interface TxnDataProps {
  collection: ICollection;
}

const Collection = ({collection}: TxnDataProps) => {
  const contentRef = useAnimatedRef<Animated.View>();
  const open = useSharedValue(false);
  const contentHeight = useSharedValue(0);
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
          style={styles.collection_header}>
          <View style={styles.collection_header_label}>
            <View style={[styles.collection_image]}>
              <FastImage
                source={{
                  uri: formatIpfsLink(collection?.contract?.imageUrl),
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={[{width: '100%', height: '100%'}]}
              />
            </View>

            <Text style={{fontSize: 15}}>
              {collection.contract.collectionName}
            </Text>
          </View>

          <Animated.View style={[animatedStyle]}>
            <CaretDown size={15} color={colors.white} weight="bold" />
          </Animated.View>
        </TouchableOpacity>

        <Animated.View style={[contentAnimatedStyle, {width: '100%'}]}>
          <Animated.View ref={contentRef} style={[styles.collection_content]}>
            {collection?.nfts?.map((nft, i) => {
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
    gap: 8,
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
