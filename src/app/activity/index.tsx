import {styles} from './styles';
import {colors} from 'utils/Theming';
import {padding} from 'helpers/styles';
import {Text} from 'components/_ui/typography';
import {Container} from 'components/_ui/custom';
import Searchbar from 'components/_common/Searchbar';
import {useAccountData} from 'providers/AccountDataProvider';
import TransactionItem from 'components/activity/transactionItem';
import {FlatList, Keyboard, TouchableOpacity, View} from 'react-native';
import {ArrowUp, ArrowDown, ClockCounterClockwise} from 'phosphor-react-native';

const Activity = () => {
  const {txnSearch, txnFilter, filteredTxns, setTxnFilter, setTxnSearch} =
    useAccountData();

  return (
    <Container paddingTop={4} style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={{fontSize: 15}}>Transaction History</Text>
      </View>

      <View
        style={[
          {
            gap: 4,
            flexDirection: 'row',
            alignItems: 'center',
            ...padding(4, 18, 10),
            justifyContent: 'space-between',
          },
        ]}>
        <Searchbar
          value={txnSearch}
          onFocus={() => {}}
          onChangeText={setTxnSearch}
          placeholder="Search an address"
        />
      </View>

      <View style={styles.filters}>
        {[
          {
            label: 'all',
            icon: (
              <ClockCounterClockwise
                size={14}
                weight="bold"
                color={txnFilter === 'all' ? colors.primary : colors.subText2}
              />
            ),
          },
          {
            label: 'sent',
            icon: (
              <ArrowUp
                size={14}
                weight="bold"
                color={txnFilter === 'sent' ? colors.primary : colors.subText2}
              />
            ),
          },
          {
            label: 'received',
            icon: (
              <ArrowDown
                size={14}
                weight="bold"
                color={
                  txnFilter === 'received' ? colors.primary : colors.subText2
                }
              />
            ),
          },
        ].map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              key={item.label}
              onPress={() => {
                setTxnSearch('');
                Keyboard.dismiss();
                setTxnFilter(item.label as typeof txnFilter);
              }}
              style={[
                styles.filter,
                {
                  borderColor:
                    txnFilter === item.label ? colors.primary : colors.black,
                  backgroundColor:
                    txnFilter === item.label
                      ? colors.accent2 + ''
                      : colors.accent2,
                },
              ]}>
              {item.icon}
              <Text
                style={[
                  {
                    fontSize: 13,
                    color:
                      txnFilter === item.label
                        ? colors.primary
                        : colors.subText2,
                    textTransform: 'capitalize',
                  },
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredTxns}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <TransactionItem txn={item} />}
        contentContainerStyle={{paddingTop: 16, paddingBottom: 46}}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
      />
    </Container>
  );
};

export default Activity;
