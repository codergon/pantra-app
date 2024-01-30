import {View} from 'react-native';
import {colors} from 'utils/Theming';
import {Path, Svg} from 'react-native-svg';
import {PaperPlane, SlidersHorizontal} from 'phosphor-react-native';

interface TabIconProps {
  color: string;
  label: string;
  focused: boolean;
}

const iconSize = 21;

const tabIcons = {
  home: (props: TabIconProps) => {
    return (
      <>
        <Svg
          style={{
            width: iconSize,
            height: iconSize,
          }}
          fill="none"
          viewBox="0 0 23 23">
          <Path
            strokeWidth={2}
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.368 2.708 2.97 6.912c-.901.701-1.632 2.193-1.632 3.325v7.42c0 2.323 1.892 4.226 4.216 4.226H17.15a4.229 4.229 0 0 0 4.215-4.216v-7.29c0-1.212-.81-2.764-1.802-3.455l-6.189-4.336c-1.402-.981-3.655-.93-5.006.12Z"
          />
          <Path
            strokeWidth={2}
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.352 17.879v-4.86"
          />
        </Svg>
      </>
    );
  },

  smartSave: (props: TabIconProps) => {
    return (
      <>
        <Svg
          style={{
            marginTop: 1,
            width: iconSize - 1,
            height: iconSize - 1,
          }}
          fill="none"
          viewBox="0 0 15 15">
          <Path
            fill={props.color}
            d="M7.713 13.092c1.667 0 3.075-.587 4.224-1.76 1.151-1.174 1.736-2.592 1.756-4.254V1.092H7.707c-1.663.02-3.081.605-4.254 1.756-1.173 1.15-1.76 2.557-1.76 4.224 0 1.666.586 3.087 1.756 4.26 1.17 1.173 2.59 1.76 4.263 1.76m-.99-2.39 3.837-3.437c.126-.112.161-.243.107-.394-.053-.152-.167-.244-.342-.277L7.32 6.32l1.823-2.494a.31.31 0 0 0 .05-.19.335.335 0 0 0-.07-.183.27.27 0 0 0-.224-.096.41.41 0 0 0-.228.094l-3.8 3.423a.362.362 0 0 0-.116.404c.047.157.158.252.332.286l3.004.273-1.81 2.494a.298.298 0 0 0-.046.19c.007.069.034.13.081.183.048.054.11.08.186.08.077 0 .15-.027.22-.083Zm.99 3.39a6.79 6.79 0 0 1-2.493-.457 7.208 7.208 0 0 1-2.1-1.256l-1.566 1.567a.507.507 0 0 1-.362.146.48.48 0 0 1-.355-.145.488.488 0 0 1-.143-.358.51.51 0 0 1 .147-.357l1.566-1.567a7.193 7.193 0 0 1-1.256-2.1 6.79 6.79 0 0 1-.457-2.492c0-1.949.682-3.6 2.046-4.952C4.103.768 5.76.09 7.71.09h6.984v6.984c0 1.95-.676 3.606-2.029 4.97-1.352 1.364-3.003 2.047-4.95 2.047"
          />
          <Path
            strokeWidth={0.2}
            stroke={props.color}
            d="M7.713 13.092c1.667 0 3.075-.587 4.224-1.76 1.151-1.174 1.736-2.592 1.756-4.254V1.092H7.707c-1.663.02-3.081.605-4.254 1.756-1.173 1.15-1.76 2.557-1.76 4.224 0 1.666.586 3.087 1.756 4.26 1.17 1.173 2.59 1.76 4.263 1.76m0 1a6.79 6.79 0 0 1-2.493-.457 7.208 7.208 0 0 1-2.1-1.256l-1.566 1.567a.507.507 0 0 1-.362.146.48.48 0 0 1-.355-.145.488.488 0 0 1-.143-.358.51.51 0 0 1 .147-.357l1.566-1.567a7.193 7.193 0 0 1-1.256-2.1 6.79 6.79 0 0 1-.457-2.492c0-1.949.682-3.6 2.046-4.952C4.103.768 5.76.09 7.71.09h6.984v6.984c0 1.95-.676 3.606-2.029 4.97-1.352 1.364-3.003 2.047-4.95 2.047m-.993-3.39 3.838-3.437c.126-.112.161-.243.107-.394-.053-.152-.167-.244-.342-.277L7.32 6.32l1.823-2.494a.31.31 0 0 0 .05-.19.335.335 0 0 0-.07-.183.27.27 0 0 0-.224-.096.41.41 0 0 0-.228.094l-3.8 3.423a.362.362 0 0 0-.116.404c.047.157.158.252.332.286l3.004.273-1.81 2.494a.298.298 0 0 0-.046.19c.007.069.034.13.081.183.048.054.11.08.186.08.077 0 .15-.027.22-.083Z"
          />
        </Svg>
      </>
    );
  },

  transactions: (props: TabIconProps) => {
    return (
      <>
        <Svg
          style={{
            marginTop: 1,
            height: iconSize - 1,
            width: (iconSize - 1) * (19 / 21),
          }}
          fill="none"
          viewBox="0 0 19 21">
          <Path
            strokeWidth={1.6}
            stroke={props?.color}
            strokeLinecap="round"
            d="M4.56 5.484h9.983M4.56 10.515h9.983M4.56 15.504h5.958M1.532 1.515h16v18h-16z"
          />
        </Svg>
      </>
    );
  },

  settings: (props: TabIconProps) => {
    return (
      <SlidersHorizontal
        weight={props?.focused ? 'fill' : 'regular'}
        size={iconSize}
        color={props?.color}
      />
    );
  },

  tabBtn: (props: TabIconProps) => {
    return (
      <>
        <View
          style={{
            width: 40,
            height: 40,
            paddingBottom: 1,
            borderRadius: 34,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary + '20',
          }}>
          <PaperPlane size={19} color={colors.primary} weight="fill" />

          {/* <Svg
            style={{
              width: 17,
              marginLeft: 2,
              height: 17 * (12 / 13),
            }}
            fill="none"
            viewBox="0 0 13 12">
            <Path
              fill={colors.primary}
              d="M.947 3.864.504.38 12.18 5.755.504 11.513.947 8.04l4.795-2.285-4.795-1.89Z"
            />
          </Svg> */}
        </View>
      </>
    );
  },
};

const TabIcon = ({color, label, focused}: TabIconProps) => {
  const Icon = tabIcons[label as keyof typeof tabIcons];

  return <Icon color={color} label={label} focused={focused} />;
};

export default TabIcon;
