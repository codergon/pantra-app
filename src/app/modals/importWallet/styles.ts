import {StyleSheet} from 'react-native';
import {colors} from 'utils/Theming';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 6,
  },

  body: {
    flex: 1,
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  actionBtn: {
    gap: 16,
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: colors.border3,
  },
  actionBtn__Icon: {
    width: 44,
    height: 44,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent3,
  },
  actionBtn__Text: {
    fontSize: 16,
  },
  actionBtn__Text__Description: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.subText,
  },
});
