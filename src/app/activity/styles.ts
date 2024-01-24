import {colors} from 'utils/Theming';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
  },
  header: {
    gap: 20,
    paddingTop: 4,
    marginBottom: 6,
    paddingLeft: 10,
    paddingRight: 20,
    paddingBottom: 4,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
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
