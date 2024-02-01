import {StyleSheet, View} from 'react-native';
import {Text} from 'components/_ui/typography';

interface IntervalProps {
  details: {
    value: number;
    label: string;
  };
}

const Interval = ({details}: IntervalProps) => {
  return (
    <View style={[styles.container]}>
      <Text style={{fontSize: 15}}>{details?.label}</Text>
    </View>
  );
};

export default Interval;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    minHeight: 22,
    alignItems: 'center',
    flexDirection: 'row',
  },

  nftImage: {
    width: 28,
    height: 28,
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
