import {colors} from 'utils/Theming';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 20,
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
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
  },

  // txn method
  txnMethodContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txnMethod: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  // txn details
  txnDetails: {
    gap: 20,
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  txn_block: {
    gap: 15,
    width: '100%',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'column',

    backgroundColor: '#1d1d1d',
    // backgroundColor: colors.accent3 + '3335e',
  },
  txn_row: {
    gap: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txn_row_label: {
    color: colors.subText3,
    textTransform: 'uppercase',
  },
  txn_row_value: {
    gap: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  txn_row_value_blockies: {
    width: 16,
    height: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
