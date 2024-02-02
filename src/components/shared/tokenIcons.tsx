import {ClipPath, Defs, G, Path, Svg} from 'react-native-svg';

interface TabIconProps {
  size?: number;
  label: string;
  color?: string;
}

const iconSize = 42;

const tokenIcons = {
  eth: (props: TabIconProps) => {
    return (
      <>
        <Svg
          style={{
            width: props.size || iconSize,
            height: props.size || iconSize,
          }}
          fill="none"
          viewBox="0 0 220 220">
          <G clipPath="url(#a)">
            <Path
              fill="#627EEA"
              d="M110 220c60.751 0 110-49.249 110-110S170.751 0 110 0 0 49.249 0 110s49.249 110 110 110Z"
            />
            <Path
              fill="#fff"
              fillOpacity={0.602}
              d="M113.424 27.5v60.981l51.542 23.031L113.424 27.5Z"
            />
            <Path
              fill="#fff"
              d="m113.424 27.5-51.549 84.012 51.549-23.03V27.5Z"
            />
            <Path
              fill="#fff"
              fillOpacity={0.602}
              d="M113.424 151.031v41.436L165 121.111l-51.576 29.92Z"
            />
            <Path
              fill="#fff"
              d="M113.424 192.467v-41.443l-51.549-29.913 51.549 71.356Z"
            />
            <Path
              fill="#fff"
              fillOpacity={0.2}
              d="m113.424 141.44 51.542-29.927-51.542-23.017v52.944Z"
            />
            <Path
              fill="#fff"
              fillOpacity={0.602}
              d="m61.875 111.513 51.549 29.927V88.496l-51.549 23.017Z"
            />
          </G>
          <Defs>
            <ClipPath id="a">
              <Path fill="#fff" d="M0 0h220v220H0z" />
            </ClipPath>
          </Defs>
        </Svg>
      </>
    );
  },
};

const TokenIcons = ({color, label, size}: TabIconProps) => {
  const Icon = tokenIcons[label as keyof typeof tokenIcons];

  return <Icon color={color} label={label} size={size} />;
};

export default TokenIcons;
