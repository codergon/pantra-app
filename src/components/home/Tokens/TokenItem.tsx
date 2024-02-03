import millify from 'millify';
import {colors} from 'utils/Theming';
import {padding} from 'helpers/styles';
import {IERC20Tokens} from 'typings/common';
import {StyleSheet, View} from 'react-native';
import {formatIpfsLink} from 'helpers/common';
import {Text} from 'components/_ui/typography';
import FastImage from 'react-native-fast-image';

interface TokenItemProps {
  token: IERC20Tokens;
}

const TokenItem = ({token}: TokenItemProps) => {
  const tokenBalance = Number(token.value) * Number(token.token.exchange_rate);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
        },
      ]}>
      <View style={[styles.token_image]}>
        {token?.token.icon_url ? (
          <FastImage
            source={{
              cache: FastImage.cacheControl.immutable,
              uri: formatIpfsLink(token?.token.icon_url),
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={[{width: '100%', height: '100%'}]}
          />
        ) : (
          <>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={[{width: '100%', height: '100%'}]}
              source={require('assets/images/masks/mask-2.png')}
            />
          </>
        )}
      </View>

      <View style={[styles.token_info]}>
        <Text style={[styles.token_name]} numberOfLines={1}>
          {token.token.name}
        </Text>

        <View
          style={{
            flex: 1,
            overflow: 'hidden',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}>
          <Text
            numberOfLines={1}
            style={[styles.token_balance, {color: colors.white}]}>
            {Number(token?.value) / 1e18 > 1e9
              ? '> 1B'
              : millify(Number(token?.value) / 1e18, {
                  precision: 2,
                  units: [' ', 'K', 'M', 'B', 'T'],
                })}{' '}
            {token?.token.symbol}
          </Text>
          <Text style={[styles.token_balance, {color: colors.subText}]}>
            {!isNaN(Number(tokenBalance))
              ? '$' +
                (Number(tokenBalance) > 1000
                  ? millify(Number(tokenBalance), {precision: 2})
                  : Number(tokenBalance).toFixed(2))
              : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TokenItem;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    ...padding(12, 14),
    flexDirection: 'row',
    borderColor: colors.border1,
  },
  token_image: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 40,
    overflow: 'hidden',
  },
  token_info: {
    gap: 20,
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  token_name: {
    flex: 0,
    fontSize: 16,
  },
  token_balance: {
    fontSize: 14,
  },
});
