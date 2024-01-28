import {colors} from 'utils/Theming';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 18,
    flex: 1,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
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

  input: {
    padding: 8,
    fontSize: 16,
    marginTop: 8,
    lineHeight: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 12,
    color: colors.white,
    borderColor: colors.border6,
  },

  selectIconType: {
    gap: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconType: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: colors.primary,
  },
  iconTypeContainer: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
