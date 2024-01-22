import {colors} from 'utils/Theming';
import {DimensionValue, View} from 'react-native';

interface IDividerProps {
  color?: string;
  opacity?: number;
  width?: DimensionValue;
  height?: DimensionValue;
  marginVertical?: number;
  marginHorizontal?: number;
}

const Divider = ({
  height = 1,
  opacity = 1,
  width = '100%',
  marginVertical = 10,
  marginHorizontal = 0,
  color = colors.accent4,
}: IDividerProps) => {
  return (
    <View
      style={{
        width,
        height,
        opacity,
        marginVertical,
        marginHorizontal,
        backgroundColor: color,
      }}
    />
  );
};

export default Divider;
