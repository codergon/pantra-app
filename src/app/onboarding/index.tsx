import Splash from './screens/splash';
import AddAccount from './screens/addAccount';
import WalletFromMnemonic from './screens/walletFromMnemonic';
import {OnboardingStackParamList} from 'typings/navigation';
import WalletFromPrivateKey from './screens/WalletFromPrivateKey';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Onboarding = () => {
  const Stack = createNativeStackNavigator<OnboardingStackParamList>();

  return (
    <>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{headerShown: false, gestureEnabled: true}}>
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="addAccount" component={AddAccount} />
        <Stack.Screen
          name="walletFromMnemonic"
          component={WalletFromMnemonic}
        />
        <Stack.Screen
          name="walletFromPrivateKey"
          component={WalletFromPrivateKey}
        />
      </Stack.Navigator>
    </>
  );
};

export default Onboarding;
