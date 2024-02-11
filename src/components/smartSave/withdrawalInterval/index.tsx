import styles from './styles';
import {Fragment} from 'react';
import Interval from './interval';
import {colors} from 'utils/Theming';
import {Text} from 'components/_ui/typography';
import {ChevronDown} from 'lucide-react-native';
import {useWallet} from 'providers/WalletProvider';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {
  Menu,
  renderers,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const WithdrawalInterval = () => {
  const {withdrawalInterval, setSavingsWithdrawal, updateWithdrawalInterval} =
    useWallet();
  const intervals = [
    {
      value: 0,
      label: 'Daily',
    },
    {
      value: 1,
      label: 'Weekly',
    },
    {
      value: 2,
      label: 'Monthly',
    },
  ];

  return (
    <>
      <Fragment>
        <Menu
          style={{
            width: '100%',
            position: 'relative',
          }}
          rendererProps={{
            preferredPlacement: 'bottom',
            placement: 'auto',
            anchorStyle: {
              opacity: 0,
            },
          }}
          renderer={renderers.Popover}>
          <MenuTrigger
            disabled={setSavingsWithdrawal.isLoading}
            customStyles={{
              triggerTouchable: {
                activeOpacity: 0.6,
                underlayColor: 'transparent',
              },
            }}>
            <View style={[styles.interval]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 15}}>Withdrawal Interval - </Text>
                <Interval
                  isActive={false}
                  details={intervals.find(i => i.value === withdrawalInterval)!}
                />
              </View>

              {setSavingsWithdrawal.isLoading ? (
                <ActivityIndicator size="small" color={colors.subText} />
              ) : (
                <ChevronDown size={17} color={colors.white} strokeWidth={2.6} />
              )}
            </View>
          </MenuTrigger>

          <MenuOptions
            optionsContainerStyle={{
              shadowOffset: {
                width: 0,
                height: 0,
              },
              elevation: 0,
              borderWidth: 1,
              maxHeight: 270,
              borderRadius: 14,
              width: 200,
              borderColor: colors.border4,
              shadowColor: 'transparent',
              backgroundColor: colors.modalBackground,
            }}
            customStyles={{
              optionsWrapper: {
                borderRadius: 14,
                overflow: 'hidden',
              },
            }}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}>
              {intervals.map((interval, index, intervals) => {
                return (
                  <MenuOption
                    key={index}
                    onSelect={() => updateWithdrawalInterval(interval.value)}
                    customStyles={{
                      optionWrapper: {
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderColor: colors.border4,
                        borderBottomWidth:
                          index === intervals.length - 1 ? 0 : 1,
                      },
                    }}>
                    <Interval
                      details={interval}
                      isActive={withdrawalInterval === interval.value}
                    />
                  </MenuOption>
                );
              })}
            </ScrollView>
          </MenuOptions>
        </Menu>
      </Fragment>
    </>
  );
};

export default WithdrawalInterval;
