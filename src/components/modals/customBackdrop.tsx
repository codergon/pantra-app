import {useMemo} from 'react';
import {colors} from 'utils/Theming';
import {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';

const CustomBackdrop: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      ['#f00', '#0f0'],
    ),
    // opacity: interpolate(animatedIndex.value, [0, 1], [0, 1]),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );

  return <Animated.View pointerEvents="none" style={[containerStyle]} />;
};

export default CustomBackdrop;
