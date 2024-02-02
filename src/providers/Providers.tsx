import '@walletconnect/react-native-compat';
import 'react-native-gesture-handler';
import App from '../App';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import WalletProvider from './WalletProvider';
import SettingsProvider from './SettingsProvider';
import AppToast from 'components/_common/appToast';
import {MenuProvider} from 'react-native-popup-menu';
import AccountDataProvider from './AccountDataProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  DarkTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';

import {WC_PROJECT_ID} from '@env';
import {lightlink} from 'utils/LightLinkChain';
import {WagmiConfig, useWalletClient} from 'wagmi';
import {defaultWagmiConfig} from '@web3modal/wagmi-react-native';

dayjs.extend(duration);
const queryClient = new QueryClient();

// Wagmi Config
const chains = [lightlink];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: WC_PROJECT_ID,
  enableWalletConnect: false,
});

useWalletClient;

const Providers = () => {
  return (
    <SafeAreaProvider>
      <WagmiConfig config={wagmiConfig as any}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={DarkTheme}>
            <NavigationContainer theme={DarkTheme}>
              <SettingsProvider>
                <WalletProvider>
                  <AccountDataProvider>
                    <MenuProvider>
                      <GestureHandlerRootView style={{flex: 1}}>
                        <>
                          <App />
                          <AppToast />
                        </>
                      </GestureHandlerRootView>
                    </MenuProvider>
                  </AccountDataProvider>
                </WalletProvider>
              </SettingsProvider>
            </NavigationContainer>
          </ThemeProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </SafeAreaProvider>
  );
};

export default Providers;
