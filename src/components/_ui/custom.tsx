import {StatusBar} from 'react-native';
import {
  View,
  ViewProps,
  ScrollView,
  ThemeProps,
  SafeAreaView as DefaultSafeArea,
} from './themed';
import {
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {colors} from 'utils/Theming';

export function SafeAreaView(props: SafeAreaViewProps & ThemeProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;

  return (
    <DefaultSafeArea
      style={[{paddingTop: 0}, style]}
      lightColor={lightColor}
      darkColor={darkColor}
      {...otherProps}>
      <ScrollView
        bounces={false}
        darkColor={darkColor}
        lightColor={lightColor}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}>
        {props.children}
      </ScrollView>
    </DefaultSafeArea>
  );
}

export function Container(
  props: ViewProps & {
    paddingTop?: number;
    offsetBottom?: boolean;
  },
) {
  const insets = useSafeAreaInsets();
  const {
    style,
    lightColor,
    darkColor,
    paddingTop,
    offsetBottom,
    ...otherProps
  } = props;

  return (
    <View
      {...otherProps}
      darkColor={darkColor}
      lightColor={lightColor}
      transparent={false}
      style={[
        {
          flex: 1,
          position: 'relative',
          flexDirection: 'column',
          paddingTop: insets.top + (paddingTop ?? 0),
          ...(offsetBottom && {paddingBottom: insets.bottom}),
        },
        style,
      ]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      {props.children}
    </View>
  );
}
