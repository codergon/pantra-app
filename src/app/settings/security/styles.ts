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
  settings: {
    gap: 24,
    width: '100%',
    flexDirection: 'column',
  },
  no_sessions: {
    flex: 1,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  no_sessions_btn: {
    height: 42,
    marginTop: 20,
    borderRadius: 6,
    alignItems: 'center',
    paddingHorizontal: 22,
    justifyContent: 'center',
    backgroundColor: colors.warning,
  },
});
