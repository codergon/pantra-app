import {colors} from 'utils/Theming';
import layout from 'constants/layout';
import {Text} from 'components/_ui/typography';
import {Backspace} from 'phosphor-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const dialPadSize = layout.width * 0.2;
const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'X'];

interface DialpadKeypadProps {
  code: number[];
  pinLength?: number;
  onComplete: (code: number[]) => void;
  setCode: React.Dispatch<React.SetStateAction<number[]>>;
}

const DialpadKeypad = ({
  code,
  setCode,
  onComplete,
  pinLength = 6,
}: DialpadKeypadProps) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View>
        <FlatList
          numColumns={3}
          bounces={false}
          data={dialPadContent}
          style={{
            paddingTop: 10,
            paddingBottom: insets?.bottom + 20,
          }}
          contentContainerStyle={styles.dialPads}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                disabled={item === ''}
                onPress={() => {
                  if (item === 'X') {
                    setCode(prev => prev.slice(0, -1));
                  } else {
                    if (code.length < pinLength) {
                      setCode(prev => [...prev, Number(item)]);
                    }
                    if (code.length == pinLength - 1) {
                      onComplete([...code, Number(item)]);
                    }
                  }
                }}
                style={[
                  {
                    marginHorizontal: dialPadSize / 4,
                  },
                  styles.dialPadContainer,
                ]}>
                {item === 'X' ? (
                  <Backspace size={22} color={colors.white} />
                ) : (
                  <Text style={[styles.dialPadText]}>{item}</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

export default DialpadKeypad;

export const styles = StyleSheet.create({
  dialPads: {
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dialPadContainer: {
    width: dialPadSize,
    height: dialPadSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialPadText: {
    fontSize: 22,
    color: colors.white,
  },
});
