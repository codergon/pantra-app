import React from 'react';
import {colors} from 'utils/Theming';
import {RgText} from 'components/_ui/typography';
import {ISettings, useSettings} from 'providers/SettingsProvider';
import {StyleSheet, Switch, TouchableOpacity, View} from 'react-native';

interface ConfigProps {
  config: {
    key: string;
    label: string;
    onSwitch?: () => void;
  };
}

const Config = ({config}: ConfigProps) => {
  const {settings, updateSettings} = useSettings();

  return (
    <TouchableOpacity
      onPress={() => {
        // updateSettings('activeConfig', Config);
      }}
      activeOpacity={0.7}
      style={[styles.container]}>
      <View style={[styles.details]}>
        <RgText style={{fontSize: 16}}>{config?.label}</RgText>
      </View>

      <Switch
        onValueChange={() => {
          config?.onSwitch!();
        }}
        ios_backgroundColor="#3e3e3e"
        thumbColor={true ? '#fff' : '#fff'}
        value={!!settings?.[config.key as keyof ISettings]}
        trackColor={{false: '#3e3e3e', true: colors.secondary}}
      />
    </TouchableOpacity>
  );
};

export default Config;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    minHeight: 34,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  details: {
    gap: 3,
    flex: 1,
    flexDirection: 'column',
  },
});
