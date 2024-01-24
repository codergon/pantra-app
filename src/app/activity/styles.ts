import {colors} from 'utils/Theming';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 4,
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

  listHeader: {
    gap: 10,
    display: 'none',
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 34,
    alignItems: 'center',
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
