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
import FastImage from 'react-native-fast-image';
import {TouchableOpacity, View} from 'react-native';
import {RgText, Text} from 'components/_ui/typography';
import {useNavigation} from '@react-navigation/native';
import {testAddress} from 'providers/AccountDataProvider';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {Copy, Notches, QrCode, ShareNetwork} from 'phosphor-react-native';

const renderScene = SceneMap({
  tokens: Tokens,
  nfts: NFTs,
});

const Home = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tokens', title: 'Tokens'},
    {key: 'nfts', title: 'NFTs'},
  ]);

  const [copied, CopyToClipboard] = useClipboard();

  return (
    <Container paddingTop={0} style={[styles.container]}>
      <HomeHeader />

      <View style={[styles.acctDetails]}>
        <View style={[styles.acctDetails__image]}>
          <FastImage
            resizeMode="cover"
            style={[styles.image]}
            source={require('assets/images/masks/mask-6.png')}
          />
        </View>

        <View style={styles.acctNameAddr}>
          <Text style={{fontSize: 20}}>alphaglitch.eth</Text>
          <RgText style={{color: colors.subText2}}>
            {truncate(testAddress, 15)}
          </RgText>
        </View>

        <View style={styles.actionBtns}>
          {[
            {
              label: 'Copy',
              icon: <Copy size={20} weight="regular" color={'#fff'} />,
              onPress: () => CopyToClipboard(testAddress),
            },
            {
              label: 'Share',
              icon: <ShareNetwork weight="regular" size={20} color={'#fff'} />,
              onPress: () => console.log('share'),
            },
            {
              label: 'QR Code',
              icon: <QrCode weight="regular" size={20} color={'#fff'} />,
              onPress: () => navigation.navigate('shareQR'),
            },
            {
              label: 'More',
              icon: <Notches weight="bold" size={18} color={colors.primary} />,
              onPress: () => console.log('share'),
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
