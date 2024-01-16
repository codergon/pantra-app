import React from 'react';
import {RgText} from 'components/_ui/typography';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface FullBtnProps {
  onPress: () => void;
  title: string;
}
const FullBtn = ({onPress, title}: FullBtnProps) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onPress();
        }}
        style={[styles.btn]}>
        <RgText
          style={[
            {
              fontSize: 14,
              color: '#000',
            },
          ]}>
          {title}
        </RgText>
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
