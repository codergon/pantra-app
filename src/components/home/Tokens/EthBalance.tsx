import millify from 'millify';
import {colors} from 'utils/Theming';
import {padding} from 'helpers/styles';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components/_ui/typography';
import TokenIcons from 'components/shared/tokenIcons';
import {useAccountData} from 'providers/AccountDataProvider';

const EthBalance = () => {
  const {etherBalance, activeCurrency, acctBalance} = useAccountData();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
        },
      ]}>
      <View style={[styles.token_image]}>
        <TokenIcons label="eth" size={32} />
      </View>

      <View style={[styles.token_info]}>
        <Text style={[styles.token_name]} numberOfLines={1}>
          Ethereum
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
            {millify(Number(etherBalance), {
              precision: 2,
            })}{' '}
            ETH
          </Text>
          <Text style={[styles.token_balance, {color: colors.subText}]}>
            {!isNaN(Number(acctBalance?.ethBalance))
              ? activeCurrency?.symbol +
                (Number(acctBalance?.ethBalance) > 1000
                  ? millify(Number(acctBalance?.ethBalance), {precision: 2})
                  : Number(acctBalance?.ethBalance).toFixed(2))
              : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EthBalance;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    width: '100%',
    marginBottom: 8,
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
