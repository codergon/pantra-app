import {StyleSheet} from 'react-native';

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
    gap: 20,
    paddingTop: 4,
    marginBottom: 6,
    paddingBottom: 4,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },

  settings: {
    gap: 24,
    width: '100%',
    flexDirection: 'column',
  },
});
