import {StyleSheet} from 'react-native';
import {colors} from 'utils/Theming';

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
  },
  illustration: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    gap: 24,
    flex: 1,
    width: '100%',
    paddingHorizontal: 18,
  },

  actionBtn: {
    gap: 16,
    width: '100%',
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: colors.accent1,
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
    color: colors.subText,
  },

  // Import Wallet Screen
  header: {
    gap: 24,
    flexDirection: 'column',
  },
  content: {
    width: '100%',
  },
  input_container: {
    height: 80,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: colors.border4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  footer: {
    gap: 34,
    flex: 1,
    paddingBottom: 18,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  info_block: {
    gap: 16,
    width: '100%',
    paddingTop: 16,
    borderRadius: 18,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.accent1,
  },
  connectBtn: {
    gap: 12,
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default styles;
