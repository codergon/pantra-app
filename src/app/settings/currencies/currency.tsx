import React from 'react';
import {colors} from 'utils/Theming';
import currencies from 'constants/currencies';
import {RgText} from 'components/_ui/typography';
import {Check} from 'phosphor-react-native';
import {useSettings} from 'providers/SettingsProvider';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface CurrencyProps {
  currency: (typeof currencies)[0];
}

const Currency = ({currency}: CurrencyProps) => {
  const {activeCurrency, updateSettings} = useSettings();

  return (
    <TouchableOpacity
      onPress={() => {
        updateSettings('activeCurrency', currency);
      }}
      activeOpacity={0.7}
      style={[styles.container]}>
      <View style={[styles.icon]}>
        <RgText style={{fontSize: 18}}>{currency.symbol}</RgText>
      </View>

      <View style={[styles.details]}>
        <RgText style={{fontSize: 16}}>
          {currency.fullName} {currency.flag}
        </RgText>
      </View>

      <View>
        {activeCurrency?.slug === currency.slug && (
          <Check size={18} weight={'bold'} color={colors.primary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Currency;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    minHeight: 34,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent2,
  },
  details: {
    gap: 3,
    flex: 1,
    flexDirection: 'column',
  },
});
