import {StyleSheet} from 'react-native';
import {colors} from 'utils/Theming';

export const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  header: {
    gap: 24,
    marginBottom: 10,
    paddingHorizontal: 18,
    flexDirection: 'column',
  },

  divider: {
    height: 1,
    width: '100%',
    borderWidth: 0.8,
    overflow: 'hidden',
    borderStyle: 'dashed',
    borderColor: colors.border4,
  },

  body: {
    gap: 24,
    width: '100%',
    paddingBottom: 34,
    paddingHorizontal: 18,
    flexDirection: 'column',
  },
  footer: {
    gap: 24,
    width: '100%',
    paddingHorizontal: 18,
    flexDirection: 'column',
  },

  addrBlocks: {
    gap: 14,
    width: '100%',
    flexDirection: 'column',
  },
  addrBlock: {
    gap: 15,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingRight: 10,
    borderColor: colors.border3,
    backgroundColor: colors.accent1,
  },
  addrBlockIcon: {
    width: 42,
    height: 42,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent3,
  },
  addrBlockText: {
    fontSize: 17,
  },
  addrBlockText_balance: {
    fontSize: 14,
    color: colors.subText2,
  },
  addressInput: {
    flex: 1,
    height: 34,
    fontSize: 17,
  },
  rowItem: {
    gap: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowItemLabel: {
    fontSize: 15,
    color: colors.subText,
  },
  currAmt: {
    gap: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 42,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
