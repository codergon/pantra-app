import {colors} from 'utils/Theming';
import layout from 'constants/layout';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
  },

  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  acctDetails: {
    gap: 16,
    paddingTop: 30,
    alignItems: 'center',
    flexDirection: 'column',
    height: Math.min(layout.height * 0.32, 400),
  },
  acctDetails__image: {
    width: 68,
    height: 68,
    borderRadius: 50,
    overflow: 'hidden',
  },
  acctNameAddr: {
    gap: 5,
    alignItems: 'center',
    paddingHorizontal: 18,
    flexDirection: 'column',
  },
  actionBtns: {
    gap: 28,
    marginTop: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  actionBtn_container: {
    gap: 14,
    alignItems: 'center',
    flexDirection: 'column',
  },
  actionBtn: {
    width: 50,
    height: 50,
    borderRadius: 68,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
});
