import React from 'react';
import {colors} from 'utils/Theming';
import {RgText} from 'components/_ui/typography';
import {StyleSheet, Switch, View} from 'react-native';
import {ISettings, useSettings} from 'providers/SettingsProvider';

interface ConfigProps {
  config: {
    key: string;
    label: string;
    onSwitch?: () => void;
    icon?: React.ReactNode;
  };
}

const Config = ({config}: ConfigProps) => {
  const {settings, passcode} = useSettings();

  return (
    <View style={[styles.container]}>
      <View style={[styles.icon]}>{config?.icon}</View>

      <View style={[styles.details]}>
        <RgText style={{fontSize: 16}}>{config?.label}</RgText>
      </View>

      <Switch
        onValueChange={() => {
          config?.onSwitch!();
        }}
        thumbColor={'#fff'}
        ios_backgroundColor={colors.switchBg}
        value={
          (config?.key === 'passcode' && !!passcode) ||
          !!settings?.[config.key as keyof ISettings]
        }
        trackColor={{false: colors.switchBg, true: colors.secondary}}
      />
    </View>
  );
};

export default Config;

const styles = StyleSheet.create({
  container: {
    gap: 14,
    minHeight: 34,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  icon: {
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    gap: 3,
    flex: 1,
    flexDirection: 'column',
  },
});
