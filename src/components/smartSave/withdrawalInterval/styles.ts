import {colors} from 'utils/Theming';
import {padding} from 'helpers/styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  interval: {
    gap: 12,
    width: '100%',
    borderWidth: 1,
    borderRadius: 14,
    ...padding(14, 14),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.border25,
    justifyContent: 'space-between',
    backgroundColor: colors.accent1,
  },
});

export default styles;
