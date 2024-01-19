import {styles} from './styles';
import {FlatList, TouchableOpacity, View} from 'react-native';
import HomeHeader from 'components/home/header';
import {ArrowUp} from 'phosphor-react-native';
import {Container} from 'components/_ui/custom';
import {RgText, Text} from 'components/_ui/typography';

import {useAccount, useBalance, useBlockNumber, useFeeData} from 'wagmi';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import { W3mButton, useWeb3Modal } from "@web3modal/wagmi-react-native";

const Home = () => {
  const navigation = useNavigation();
  const {address, isConnected} = useAccount();
  const {data: feeData} = useFeeData({formatUnits: 'ether'});
  const {data: balance} = useBalance({address, formatUnits: 'ether'});

  useEffect(() => {
    // navigation.navigate('pairModal');
  }, []);

  // console.log(feeData);

  // const { open } = useWeb3Modal();

  return (
    <Container paddingTop={0} style={[styles.container]}>
      <HomeHeader />

      {isConnected ? (
        <TouchableOpacity
          onPress={() => {
            // open();
          }}
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

      {/* <W3mButton accountStyle={{}} /> */}
    </Container>
  );
};

export default Home;
