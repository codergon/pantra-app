import React from 'react';
import {colors} from 'utils/Theming';
import {Text} from 'components/_ui/typography';
import {TouchableOpacity, StyleSheet} from 'react-native';

interface IAcceptRejectButtonProps {
  flex?: number;
  title: string;
  accept: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export function AcceptRejectButton({
  title,
  accept,
  onPress,
  flex = 1,
  disabled,
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
      disabled={disabled}
      style={[
        styles.actionBtn,
        {
          flex,
          opacity: disabled ? 0.5 : 1,
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
