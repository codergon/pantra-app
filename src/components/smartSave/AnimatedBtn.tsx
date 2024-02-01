import React from 'react';
import {colors} from 'utils/Theming';
import layout from 'constants/layout';
import {StyleSheet, View} from 'react-native';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Icons from 'components/_common/Icons';

const SIZE = 76;

export default function AnimatedBtn() {
  const width = useSharedValue(0);
  const pressed = useSharedValue(false);
  const offset = useSharedValue(-(layout.width - 58) / 2 + SIZE / 2);

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
        offset.value > 0
          ? width.value / 2 - SIZE / 2
          : -(width.value / 2) + SIZE / 2,

        {
          overshootClamping: true,
        },
      );
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  useAnimatedReaction(
    () => pressed.value,
    pressed => {
      if (!pressed) {
        // console.log(offset.value, width.value / 2 - SIZE / 2);
      }
    },
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        onLayout={e => {
          width.value = e.nativeEvent.layout.width;
        }}
        style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]}>
            <Icons.lighlink size={30} />
          </Animated.View>
        </GestureDetector>
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
