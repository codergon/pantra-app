import styles from './styles';
import Interval from './interval';
import {colors} from 'utils/Theming';
import {Fragment, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {ChevronDown} from 'lucide-react-native';
import {Text} from 'components/_ui/typography';
import {
  Menu,
  renderers,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const WithdrawalInterval = () => {
  const [interval, setInterval] = useState({
    value: 0,
    label: 'Daily',
  });

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
            customStyles={{
              triggerTouchable: {
                activeOpacity: 0.6,
                underlayColor: 'transparent',
              },
            }}>
            <View
              style={[
                styles.interval,
                {
                  borderColor: '#444',
                },
              ]}>
              <View
                style={{
                  // gap: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 15}}>Withdrawal Interval - </Text>
                <Interval details={interval} />
              </View>

              <ChevronDown size={17} color={colors.white} strokeWidth={2.6} />
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
              {[
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
              ].map((interval, index, intervals) => {
                return (
                  <MenuOption
                    key={index}
                    onSelect={() => setInterval(interval)}
                    customStyles={{
                      optionWrapper: {
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderColor: colors.border4,
                        borderBottomWidth:
                          index === intervals.length - 1 ? 0 : 1,
                      },
                    }}>
                    <Interval details={interval} />
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
