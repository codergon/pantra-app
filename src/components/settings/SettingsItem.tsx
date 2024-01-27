import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RgText, Text} from 'components/_ui/typography';
import {colors} from 'utils/Theming';
import {ArrowSquareOut, CaretRight} from 'phosphor-react-native';

interface SettingsItemProps {
  title: string;
  link?: string;
  onPress?: () => void;
  description?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const SettingsItem = ({
  icon,
  title,
  link,
  onPress,
  rightIcon,
  description,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      onPress={link ? () => Linking.openURL(link) : onPress}
      activeOpacity={0.7}
      style={[styles.container]}>
      {icon && <View>{icon}</View>}

      <View style={[styles.details]}>
        <Text style={{fontSize: 16}}>{title}</Text>
        {description && (
          <RgText style={{fontSize: 14, color: colors.subText2}}>
            {description}
          </RgText>
        )}
      </View>

      <View>
        {rightIcon ? (
          rightIcon
        ) : (
          <>
            {link ? (
              <ArrowSquareOut
                size={18}
                weight={'bold'}
                color={colors.subText2}
              />
            ) : (
              <CaretRight size={18} weight={'bold'} color={colors.subText2} />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;

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
