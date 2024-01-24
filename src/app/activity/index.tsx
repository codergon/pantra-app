import {styles} from './styles';
import {View} from 'react-native';
import {Text} from 'components/_ui/typography';
import {Container} from 'components/_ui/custom';
import {useAccountData} from 'providers/AccountDataProvider';

const Activity = () => {
  const {acctTxns} = useAccountData();

  console.log(JSON.stringify(acctTxns?.data?.transfers?.[0], null, 2));

  return (
    <Container paddingTop={4} style={[styles.container]}>
      <View style={styles.header}>
        <Text style={{fontSize: 15}}>Transaction History</Text>
      </View>
    </Container>
  );
};

export default Activity;
