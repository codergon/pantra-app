import {Fragment} from 'react';
import {colors} from 'utils/Theming';
import AnimatedBtn from './AnimatedBtn';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components/_ui/typography';
import {useWallet} from 'providers/WalletProvider';
import {ChevronLeft, ChevronRight} from 'lucide-react-native';

const BackgroundText = () => {
  const {smartSavings} = useWallet();

  return (
    <View style={styles.btnBG}>
      <Text style={styles.btnBG_text}>
        Turn {smartSavings ? 'off' : 'on'} smart savings
      </Text>
      <View
        style={[
          styles.btnBG_icons,
          {
            ...(smartSavings ? {left: 20} : {right: 20}),
          },
        ]}>
        {[1, 2, 3].map((_, i) => {
          return (
            <Fragment key={i}>
              {smartSavings ? (
                <ChevronLeft
                  size={20}
                  color={
                    i === 0
                      ? colors.subText1
                      : i === 1
                      ? colors.subText2
                      : colors.white
                  }
                  style={{marginRight: -12}}
                />
              ) : (
                <ChevronRight
                  size={20}
                  color={
                    i === 0
                      ? colors.subText1
                      : i === 1
                      ? colors.subText2
                      : colors.white
                  }
                  style={{marginRight: -12}}
                />
              )}
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};

const SavingsToggleBtn = () => {
  const {smartSavings, getSavingsWallet, toggleSmartSavings} = useWallet();

  return (
    <>
      <View
        style={{
          height: 66,
          padding: 7,
          width: '100%',
          borderWidth: 2,
          borderRadius: 50,
          overflow: 'hidden',
          borderColor: '#333',
          position: 'relative',
        }}>
        <View style={[styles.btnContainer]}>
          <BackgroundText />
          <AnimatedBtn />
        </View>
      </View>
    </>
  );
};

export default SavingsToggleBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
  },
  btn: {
    zIndex: 2,
    width: 76,
    height: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  btnBG: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnBG_text: {
    fontSize: 16,
    color: colors.white,
    position: 'absolute',
  },
  btnBG_icons: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
