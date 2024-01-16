import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import { colors } from "constants/appColors";

const CustomBackground: React.FC<
  BottomSheetBackgroundProps & {
    borderRadius?: number;
  }
> = ({ style, borderRadius = 32, animatedIndex }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [colors.modalBackground, colors.modalBackground]
    ),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  );

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        containerStyle,
        {
          borderRadius: borderRadius,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        },
      ]}
    />
  );
};

export default CustomBackground;
