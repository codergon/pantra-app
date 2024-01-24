import {StyleSheet} from 'react-native';
import {colors} from 'utils/Theming';

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
    paddingHorizontal: 18,
  },
  header: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_title: {
    gap: 6,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  content: {
    gap: 18,
    width: '100%',
  },

  nft_image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.accent0,
  },
  nft_info: {
    gap: 2,
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'column',
    // paddingHorizontal: 8,
  },
  nft_collection: {
    fontSize: 22,
    textTransform: 'capitalize',
  },
  nft_name: {
    fontSize: 16,
    color: colors.subText,
  },

  collection_details: {
    gap: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  collection_image: {
    width: 44,
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: colors.accent2,
  },

  collection_info: {
    flex: 1,
    overflow: 'hidden',
    paddingVertical: 10,
    flexDirection: 'column',
  },
  collection_name: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  collection_desc: {
    fontSize: 14,
    color: colors.subText,
  },

  nft_stats: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.border2,
    backgroundColor: colors.accent0,
    justifyContent: 'space-between',
  },
  nft_stat: {
    flex: 1,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stat_label: {
    fontSize: 20,
  },
  stat_value: {
    fontSize: 20,
    color: colors.subText,
  },
});

export default styles;
