import React, {useMemo} from 'react';
import {colors} from 'utils/Theming';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';

const CustmBackdrop: React.FC<BottomSheetBackdropProps> = ({
  style,
  animatedIndex,
}) => {
  const containerStyle = useMemo(() => [style], [style]);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        containerStyle,
        backdropAnimatedStyle,
        {backgroundColor: colors.background},
      ]}
    />
  );
};

export default CustmBackdrop;
