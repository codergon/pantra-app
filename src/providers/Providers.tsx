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
import {DarkTheme, ThemeProvider} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {WagmiConfig} from 'wagmi';
import {WC_PROJECT_ID} from '@env';
import {defaultWagmiConfig} from '@web3modal/wagmi-react-native';
import {mainnet, polygon, arbitrum, polygonMumbai} from 'wagmi/chains';

dayjs.extend(duration);
const queryClient = new QueryClient();

// Wagmi Config
const chains = [mainnet, polygon, arbitrum, polygonMumbai];
const wagmiConfig = defaultWagmiConfig({
  chains,
  enableWalletConnect: false,
  projectId: WC_PROJECT_ID,
});

const Providers = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={DarkTheme}>
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
          </ThemeProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </SafeAreaProvider>
  );
};

export default Providers;
