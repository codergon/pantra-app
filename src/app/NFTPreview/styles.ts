import {StyleSheet} from 'react-native';
import {colors} from 'utils/Theming';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    marginBottom: 14,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
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
    gap: 12,
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
    gap: 2,
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
    overflow: 'hidden',
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 18,
    flexDirection: 'column',
    borderColor: colors.border2,
    backgroundColor: colors.accent0,
    justifyContent: 'space-between',
  },
  nft_stat_title: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.border,
  },
  nft_stat_title_text: {
    fontSize: 16,
    textTransform: 'capitalize',
  },

  nft_stat: {
    gap: 30,
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat_label: {
    fontSize: 14,
  },
  stat_value: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
    color: colors.subText,
  },
});

export default styles;
