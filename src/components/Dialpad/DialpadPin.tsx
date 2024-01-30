import {useEffect} from 'react';
import {colors} from 'utils/Theming';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface DialpadPinProps {
  code: number[];
  pinLength?: number;
  isIncorrect?: boolean;
}

const DialpadPin = ({code, pinLength = 6, isIncorrect}: DialpadPinProps) => {
  const pinSize = 20;
  const animatedValue = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          animatedValue.value,
          [0, 0.166, 0.333, 0.5, 0.666, 0.833, 1],
          [0, -10, 10, -10, 10, -10, 0],
        ),
      },
    ],
  }));

  useEffect(() => {
    animatedValue.value = withTiming(isIncorrect ? 1 : 0, {
      easing: Easing.linear,
      duration: isIncorrect ? 600 : 0,
    });
  }, [isIncorrect]);

  return (
    <View style={styles.dialPadPinContainer}>
      {Array(pinLength)
        .fill(pinLength)
        .map((_, index) => {
          const isSelected = code.length >= index + 1;

          return (
            <Animated.View
              key={index}
              style={[
                {
                  width: pinSize,
                  borderWidth: 2,
                  height: pinSize,
                  overflow: 'hidden',
                  borderRadius: pinSize,
                  borderColor: !isSelected
                    ? colors.border4
                    : isIncorrect
                    ? colors.error
                    : colors.white,
                },
                animatedStyles,
              ]}>
              {isSelected && (
                <View
                  style={[
                    styles.pinContent,
                    {
                      backgroundColor: isIncorrect
                        ? colors.error
                        : colors.white,
                    },
                  ]}
                />
              )}
            </Animated.View>
          );
        })}
    </View>
  );
};

export default DialpadPin;

const styles = StyleSheet.create({
  dialPadPinContainer: {
    gap: 16,
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinContent: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});
