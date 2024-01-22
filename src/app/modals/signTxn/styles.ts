import {colors} from 'utils/Theming';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 18,
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  actionBtns: {
    gap: 16,
    width: '100%',
    flexDirection: 'row',
  },
});
