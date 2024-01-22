import {colors} from 'utils/Theming';
import {CaretDown, Note} from 'phosphor-react-native';
import {RgText, Text} from 'components/_ui/typography';
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
  txnData: {
    [key: string]: any;
  };
}

const TxnData = ({txnData}: TxnDataProps) => {
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
      <View style={[styles.txn_data]}>
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
          style={styles.txn_data_header}>
          <View style={styles.txn_data_header_label}>
            <Note size={16} color={colors.primary} weight="light" />
            <Text style={{color: colors.primary}}>View Data</Text>
          </View>

          <Animated.View style={[animatedStyle]}>
            <CaretDown size={15} color={colors.primary} weight="bold" />
          </Animated.View>
        </TouchableOpacity>

        <Animated.View style={[contentAnimatedStyle, {width: '100%'}]}>
          <Animated.View ref={contentRef} style={[styles.txn_data_content]}>
            <RgText
              style={{fontSize: 13, color: colors.subText4, lineHeight: 20}}>
              Function: setApprovalForAll(address operator, bool approved){' '}
              {'\n'}
              MethodID: 0xa22cb465 [0]:
              0000000000000000000000001e0049783f008a0085193e00003d00cd54003c71
              [1]:
              0000000000000000000000000000000000000000000000000000000000000001
            </RgText>
          </Animated.View>
        </Animated.View>
      </View>
    </>
  );
};

export default TxnData;

const styles = StyleSheet.create({
  txn_data: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'column',
    backgroundColor: colors.accent2,
  },
  txn_data_header: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txn_data_header_label: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txn_data_content: {
    top: 0,
    left: 0,
    width: '100%',
    paddingTop: 14,
    paddingBottom: 16,
    borderTopWidth: 1,
    position: 'absolute',
    paddingHorizontal: 10,
    borderTopColor: colors.accent4,
  },
});
