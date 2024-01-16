import '@walletconnect/react-native-compat';
import 'react-native-gesture-handler';
import App from '../App';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import AppContextProvider from './AppProvider';
import useColorScheme from 'hooks/useColorScheme';
import SettingsProvider from './SettingsProvider';
import AppToast from 'components/_common/appToast';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';

import {WagmiConfig} from 'wagmi';
import {mainnet, polygon, arbitrum, polygonMumbai} from 'wagmi/chains';

import {defaultWagmiConfig} from '@web3modal/wagmi-react-native';

dayjs.extend(duration);
const queryClient = new QueryClient();

// Wagmi Config
const chains = [mainnet, polygon, arbitrum, polygonMumbai];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: '',
  enableWalletConnect: false,
});

const Providers = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <NavigationContainer
              theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <SettingsProvider>
                <AppContextProvider>
                  <MenuProvider>
                    <GestureHandlerRootView style={{flex: 1}}>
                      <>
                        <App />
                        <AppToast />
                      </>
                    </GestureHandlerRootView>
                  </MenuProvider>
                </AppContextProvider>
              </SettingsProvider>
            </NavigationContainer>
          </ThemeProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </SafeAreaProvider>
  );
};

export default Providers;
