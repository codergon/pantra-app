import {colors} from 'utils/Theming';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 22,
    flex: 1,
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },

  header: {
    width: '100%',
    paddingBottom: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },
  closeBtn: {
    width: 25,
    height: 25,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  actionBtns: {
    gap: 16,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
  },
});
