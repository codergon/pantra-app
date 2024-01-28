import {colors} from 'utils/Theming';
import {Text} from 'components/_ui/typography';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface WalletOptionProps {
  option: {
    color?: string;
    label: string;
    onPress: () => void;
    icon: React.ReactNode;
  };
}

const WalletOption = ({option}: WalletOptionProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={option?.onPress}
      style={[styles.option]}>
      <View style={styles.icon}>{option?.icon}</View>

      <Text style={{color: option?.color ?? colors.white}}>
        {option?.label}
      </Text>
    </TouchableOpacity>
  );
};

export default WalletOption;

export const styles = StyleSheet.create({
  option: {
    gap: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
});
