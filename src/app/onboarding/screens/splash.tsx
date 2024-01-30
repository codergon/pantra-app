import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import Image from 'react-native-fast-image';
import FullBtn from 'components/shared/fullBtn';
import {Container} from 'components/_ui/custom';
import {useNavigation} from '@react-navigation/native';
import {Header, RgText} from 'components/_ui/typography';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Splash = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Container
      style={[
        styles.container,
        {
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 20,
        },
      ]}>
      <View style={styles.illustration}>
        <Image
          resizeMode={Image.resizeMode.contain}
          style={{width: '90%', height: '90%'}}
          source={require('assets/images/grads/1.png')}
        />
      </View>

      <View style={[styles.body]}>
        <View style={{gap: 4}}>
          <Header style={{textAlign: 'center'}}>Pantra - Smart Wallet</Header>
          <RgText
            style={[
              {
                fontSize: 14,
                textAlign: 'center',
                color: '#777',
              },
            ]}>
            Non-custodial wallet with smart savings powered by LightLink.
          </RgText>
        </View>

        <FullBtn
          title="Continue"
          onPress={() => {
            navigation.navigate('addAccount');
          }}
        />
      </View>
    </Container>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    gap: 50,
    flex: 1,
  },
  illustration: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    gap: 20,
    width: '100%',
    paddingHorizontal: 18,
  },
  connectBtn: {
    gap: 12,
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
