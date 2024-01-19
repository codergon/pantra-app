import {colors} from 'utils/Theming';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import makeBlockie from 'ethereum-blockies-base64';
import {RgText, Text} from 'components/_ui/typography';

const AcctInfoBlock = () => {
  return (
    <View style={[styles.info_block]}>
      <View
        style={[
          styles.infoIcon,
          {
            backgroundColor: colors.warning + '20',
          },
        ]}>
        <FastImage
          resizeMode="cover"
          style={[styles.image]}
          source={{
            uri: makeBlockie('0xfe83aa8439a8699a25ca47d81e9be430f5476f93'),
          }}
        />
      </View>

      <View
        style={{
          gap: 4,
          flex: 1,
          flexDirection: 'column',
        }}>
        <Text style={[styles.infoText, {color: colors.warning}]}>
          Alphaglitch🦅{' '}
          <Text style={{fontSize: 13, color: colors.warning}}>
            [0xFE83...6F93]
          </Text>
        </Text>
        <RgText style={[styles.infoText_desc]}>
          Balance: 0.00091 ETH ($2.25)
        </RgText>
      </View>
    </View>
  );
};

export default AcctInfoBlock;

const styles = StyleSheet.create({
  info_block: {
    gap: 16,
    width: '100%',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,

    borderWidth: 1,
    borderColor: colors.accent3,
    backgroundColor: colors.accent3 + '3335e',
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 42,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent3,
  },
  infoText: {
    fontSize: 14,
  },
  infoText_desc: {
    fontSize: 13,
    color: colors.subText2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
