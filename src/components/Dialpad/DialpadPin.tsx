import {StyleSheet, View} from 'react-native';
import {colors} from 'utils/Theming';

interface DialpadPinProps {
  code: number[];
  pinLength?: number;
}

const DialpadPin = ({code, pinLength = 6}: DialpadPinProps) => {
  const pinSize = 20;

  return (
    <View style={styles.dialPadPinContainer}>
      {Array(pinLength)
        .fill(pinLength)
        .map((_, index) => {
          const isSelected = code.length >= index + 1;

          return (
            <View
              key={index}
              style={{
                width: pinSize,
                borderWidth: 2,
                height: pinSize,
                overflow: 'hidden',
                borderRadius: pinSize,
                borderColor: !isSelected ? colors.border4 : colors.white,
              }}>
              {isSelected && <View style={[styles.pinContent]} />}
            </View>
          );
        })}
    </View>
  );
};

export default DialpadPin;

const styles = StyleSheet.create({
  dialPadPinContainer: {
    gap: 16,
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinContent: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: colors.white,
  },
});
