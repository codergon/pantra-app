import {StyleSheet} from 'react-native';
import {colors} from 'utils/Theming';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },

  header: {
    gap: 2,
    paddingTop: 14,
    marginBottom: 28,
    paddingBottom: 4,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  content: {
    gap: 20,
    paddingVertical: 20,
    flexDirection: 'column',
  },

  addrBlockContainer: {
    gap: 24,
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'column',
    borderColor: colors.border25,
    backgroundColor: colors.accent1,
  },
  addrBlock: {
    gap: 15,
    paddingRight: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
