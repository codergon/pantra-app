import millify from 'millify';
import {colors} from 'utils/Theming';
import {padding} from 'helpers/styles';
import {OwnedToken} from 'alchemy-sdk';
import {formatIpfsLink} from 'helpers/common';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components/_ui/typography';
import FastImage from 'react-native-fast-image';
import {useAccountData} from 'providers/AccountDataProvider';

interface TokenItemProps {
  token: OwnedToken;
}

const TokenItem = ({token}: TokenItemProps) => {
  const {tokensBalances, activeCurrency} = useAccountData();

  const tokenBalance =
    tokensBalances[token.contractAddress]?.[activeCurrency?.slug] *
    Number(token.balance);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border3,
        },
      ]}>
      <View style={[styles.token_image]}>
        {token?.logo ? (
          <FastImage
            source={{
              uri: formatIpfsLink(token?.logo),
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={[{width: '100%', height: '100%'}]}
          />
        ) : (
          <>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={[{width: '100%', height: '100%'}]}
              source={require('assets/images/masks/mask-1.png')}
            />
          </>
        )}
      </View>

      <View style={[styles.token_info]}>
        <Text style={[styles.token_name]} numberOfLines={1}>
          {token?.name}
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
            {millify(Number(token?.balance), {
              precision: 2,
            })}{' '}
            {token?.symbol}
          </Text>
          <Text style={[styles.token_balance, {color: colors.subText}]}>
            {!isNaN(Number(tokenBalance))
              ? activeCurrency?.symbol +
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
