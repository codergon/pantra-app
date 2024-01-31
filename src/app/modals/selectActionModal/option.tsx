import {colors} from 'utils/Theming';
import {Text} from 'components/_ui/typography';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface ModalOptionProps {
  option: {
    color?: string;
    label: string;
    onPress: () => void;
    description?: string;
    icon: React.ReactNode;
  };
}

const ModalOption = ({option}: ModalOptionProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={option?.onPress}
      style={[styles.option]}>
      <View style={styles.icon}>{option?.icon}</View>

      <View
        style={{
          gap: 3,
          flexDirection: 'column',
        }}>
        <Text style={{fontSize: 16, color: option?.color ?? colors.white}}>
          {option?.label}
        </Text>
        {option?.description && (
          <Text style={{color: colors.subText2, fontSize: 13}}>
            {option?.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ModalOption;

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
