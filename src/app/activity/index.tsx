import {styles} from './styles';
import {View} from 'react-native';
import {Text} from 'components/_ui/typography';
import {Container} from 'components/_ui/custom';

const Activity = () => {
  return (
    <Container paddingTop={6} style={[styles.container]}>
      <View style={styles.header}>
        <Text>Transaction History</Text>
      </View>
    </Container>
  );
};

export default Activity;
