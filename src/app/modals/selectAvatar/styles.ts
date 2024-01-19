import {colors} from 'utils/Theming';
import {padding} from 'helpers/styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 6,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomColor: colors.border3,
  },
  headerTxtContainer: {
    gap: 2,
    flexDirection: 'column',
  },
  headerTxt: {
    fontSize: 20,
  },
  headerBtn: {
    height: 42,
    padding: 0,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: colors.border4,
    backgroundColor: colors.accent3,
  },

  avatars: {
    flex: 1,
    minHeight: 100,
    paddingHorizontal: 14,
  },
  listContainer: {
    paddingTop: 12,
    paddingBottom: 60,
  },
  avatar: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 52,
    marginHorizontal: 6,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});
