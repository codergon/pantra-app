import {styles} from './styles';
import {TouchableOpacity} from 'react-native';
import {Text} from 'components/_ui/typography';
import HomeHeader from 'components/home/header';
import {Container} from 'components/_ui/custom';

import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAccount, useBalance, useFeeData} from 'wagmi';

const Home = () => {
  const navigation = useNavigation();
  const {address, isConnected} = useAccount();
  const {data: feeData} = useFeeData({formatUnits: 'ether'});
  const {data: balance} = useBalance({address, formatUnits: 'ether'});

  useEffect(() => {
    navigation.navigate('signTxnModal');
  }, []);

  return (
    <Container paddingTop={0} style={[styles.container]}>
      <HomeHeader />

      {isConnected ? (
        <TouchableOpacity
          onPress={() => {}}
          style={{
            marginVertical: 20,
            paddingHorizontal: 20,
          }}>
          <Text numberOfLines={1}>Address: {address}</Text>
          <Text>
            Balance: {balance?.formatted} {balance?.symbol}
          </Text>
          <Text>Gas price: {feeData?.formatted.gasPrice ?? 0} ETH</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Home;
