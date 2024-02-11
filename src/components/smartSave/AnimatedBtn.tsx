import {colors} from 'utils/Theming';
import layout from 'constants/layout';
import {useEffect, useState} from 'react';
import Icons from 'components/_common/Icons';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useWallet} from 'providers/WalletProvider';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';

const SIZE = 76;

export default function AnimatedBtn() {
  const width = layout.width - 58;
  const rightOffset = width / 2 - SIZE / 2;
  const leftOffset = -rightOffset;

  const {
    smartSavings,
    getSavingsWallet,
    toggleSmartSavings,
    createSavingsWallet,
  } = useWallet();

  const pressed = useSharedValue(false);
  const [swiped, setSwiped] = useState(false);
  const [isAddingWallet, setIsAddingWallet] = useState(false);

  const offset = useSharedValue(smartSavings ? rightOffset : leftOffset);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      offset.value += event.changeX;
    })
    .onFinalize(event => {
      offset.value = withSpring(
        // if btn is beyond half, snap to end
        offset.value > 0 ? rightOffset : leftOffset,
        {
          overshootClamping: true,
        },
      );
      pressed.value = false;
      if (!swiped) runOnJS(setSwiped)(true);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  useAnimatedReaction(
    () => pressed.value,
    pressed => {
      if (!pressed) {
        runOnJS(setIsAddingWallet)(offset.value > 0);
      }
    },
  );

  useEffect(() => {
    if (swiped) {
      toggleSmartSavings();
    }
  }, [isAddingWallet]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.wrapper}>
        {getSavingsWallet.isLoading || createSavingsWallet.isLoading ? (
          <>
            <Animated.View style={[styles.box, animatedStyles]}>
              <ActivityIndicator size="small" color={colors.subText} />
            </Animated.View>
          </>
        ) : (
          <>
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.box, animatedStyles]}>
                <Icons.lighlink size={30} />
              </Animated.View>
            </GestureDetector>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: SIZE,
    height: SIZE - 28,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
