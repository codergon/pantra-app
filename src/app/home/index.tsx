import {useState} from 'react';
import {styles} from './styles';
import {colors} from 'utils/Theming';
import layout from 'constants/layout';
import NFTs from 'components/home/NfFTs';
import {truncate} from 'utils/HelperUtils';
import Tokens from 'components/home/Tokens';
import useClipboard from 'hooks/useClipboard';
import HomeHeader from 'components/home/header';
import {Container} from 'components/_ui/custom';
import {TouchableOpacity, View} from 'react-native';
import {useWallet} from 'providers/WalletProvider';
import WalletIcon from 'components/shared/WalletIcon';
import {RootTabScreenProps} from 'typings/navigation';
import {RgText, Text} from 'components/_ui/typography';
import {testAddress} from 'providers/AccountDataProvider';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {Copy, Notches, QrCode, PencilSimple} from 'phosphor-react-native';

const renderScene = SceneMap({
  tokens: Tokens,
  nfts: NFTs,
});

const Home = ({navigation}: RootTabScreenProps<'home'>) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tokens', title: 'Tokens'},
    {key: 'nfts', title: 'NFTs'},
  ]);

  const {account} = useWallet();
  const [copied, CopyToClipboard] = useClipboard();

  return (
    <Container paddingTop={0} style={[styles.container]}>
      <HomeHeader navigation={navigation} />

      <View style={[styles.acctDetails]}>
        <WalletIcon size={68} addres={testAddress} />

        <View style={styles.acctNameAddr}>
          <Text style={{fontSize: 20}}>alphaglitch.eth</Text>
          <RgText style={{color: colors.subText2}}>
            {truncate(testAddress, 15)}
          </RgText>
        </View>

        <View style={styles.actionBtns}>
          {[
            {
              label: copied ? 'Copied' : 'Copy',
              icon: (
                <Copy
                  size={20}
                  weight={copied ? 'fill' : 'regular'}
                  color={colors[copied ? 'primary' : 'white']}
                />
              ),
              onPress: () => CopyToClipboard(testAddress),
            },
            {
              label: 'Edit',
              icon: <PencilSimple weight="regular" size={20} color={'#fff'} />,
              onPress: () =>
                navigation.navigate('editWallet', {wallet: account!}),
            },
            {
              label: 'QR Code',
              icon: <QrCode weight="regular" size={20} color={'#fff'} />,
              onPress: () =>
                navigation.navigate('shareQR', {address: testAddress}),
            },
            {
              label: 'More',
              icon: <Notches weight="bold" size={18} color={colors.primary} />,
              onPress: () =>
                navigation.navigate('walletOptions', {wallet: account!}),
            },
          ].map((btn, i) => {
            return (
              <View key={i} style={styles.actionBtn_container}>
                <TouchableOpacity
                  onPress={btn.onPress}
                  style={[styles.actionBtn]}>
                  {btn.icon}
                </TouchableOpacity>

                <Text style={{fontSize: 13}}>{btn.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={[{flex: 1}]}>
        <TabView
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: colors.primary}}
              style={{
                height: 46,
                marginHorizontal: 18,
                // borderBottomWidth: 1,
                borderColor: colors.border1,
                backgroundColor: 'transparent',
              }}
              renderLabel={({route, focused, color}) => (
                <Text
                  style={{
                    fontSize: 15,
                    color: focused ? colors.primary : colors.neutral,
                  }}>
                  {route.title}
                </Text>
              )}
            />
          )}
          renderScene={renderScene}
          onIndexChange={setIndex}
          navigationState={{index, routes}}
          initialLayout={{width: layout.width}}
        />
      </View>
    </Container>
  );
};

export default Home;
