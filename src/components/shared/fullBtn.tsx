import React from 'react';
import {RgText} from 'components/_ui/typography';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface FullBtnProps {
  gap?: number;
  title: string;
  onPress: () => void;
  children?: React.ReactNode;
  style?: TouchableOpacityProps['style'];
}
const FullBtn = ({gap, onPress, title, children}: FullBtnProps) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onPress();
        }}
        style={[styles.btn, {gap: gap || 12}]}>
        <RgText
          style={[
            {
              fontSize: 14,
              color: '#000',
            },
          ]}>
          {title}
        </RgText>
        {children}
      </TouchableOpacity>
    </>
  );
};

export default FullBtn;

const styles = StyleSheet.create({
  btn: {
    gap: 12,
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
