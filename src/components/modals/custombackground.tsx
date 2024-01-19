import React, {useMemo} from 'react';
import {colors} from 'utils/Theming';
import Animated from 'react-native-reanimated';
import {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';

const CustomBackground: React.FC<
  BottomSheetBackgroundProps & {
    borderRadius?: number;
  }
> = ({style, borderRadius = 32, animatedIndex}) => {
  const containerStyle = useMemo(() => [style], [style]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {backgroundColor: colors.modalBackground},
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
