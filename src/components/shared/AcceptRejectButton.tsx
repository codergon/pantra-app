import React from 'react';
import {colors} from 'utils/Theming';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

interface IAcceptRejectButtonProps {
  title: string;
  accept: boolean;
  onPress: () => void;
}

export function AcceptRejectButton({
  title,
  accept,
  onPress,
}: IAcceptRejectButtonProps) {
  const btnColors = accept
    ? {
        text: '#000',
        bg: colors.primary,
      }
    : {
        text: '#fff',
        border: '#444',
        bg: '#33333340',
      };

  return (
    <TouchableOpacity
      style={[
        styles.actionBtn,
        {
          flex: 1,
          borderColor: btnColors.border,
          backgroundColor: btnColors.bg,
          borderWidth: btnColors.border ? 1 : 0,
        },
      ]}
      onPress={onPress}>
      <Text
        style={{
          color: btnColors.text,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionBtn: {
    gap: 12,
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
