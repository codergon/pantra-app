import {colors} from 'utils/Theming';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 18,
    flex: 1,
    paddingTop: 18,
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

  passphrase: {
    padding: 16,
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: colors.accent22,
  },
  group: {
    gap: 16,
    flex: 1,
    flexDirection: 'column',
  },
  word: {
    gap: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  numbering: {
    width: 22,
    alignItems: 'flex-end',
    flexDirection: 'column',
  },

  info_block: {
    gap: 16,
    width: '100%',
    paddingTop: 16,
    borderRadius: 18,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.accent22,
  },
  actionBtn__Icon: {
    width: 42,
    height: 42,
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
    lineHeight: 16,
    color: colors.subText2,
  },
});
