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

  filters: {
    gap: 10,
    paddingTop: 10,
    paddingBottom: 14,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderBottomColor: colors.border,
  },

  filter: {
    gap: 6,
    height: 32,
    minWidth: 72,
    borderRadius: 34,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
});
