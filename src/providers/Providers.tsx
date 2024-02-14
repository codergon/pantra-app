import '@walletconnect/react-native-compat';
import 'react-native-gesture-handler';
import App from '../App';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import WalletProvider from './WalletProvider';
import SessionProvider from './SessionProvider';
import SettingsProvider from './SettingsProvider';
import AppToast from 'components/_common/appToast';
import {MenuProvider} from 'react-native-popup-menu';
import AccountDataProvider from './AccountDataProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  DarkTheme,
  ThemeProvider,
  NavigationContainer,
} from '@react-navigation/native';

import {WagmiConfig} from 'wagmi';
import {WC_PROJECT_ID} from '@env';
import {createWalletClient, http} from 'viem';
import {lightlink} from 'utils/LightLinkChain';
import {MockConnector} from '@wagmi/core/connectors/mock';
import {TESTNET_RPC_URL, ZERO_ADDRESS} from 'contracts/data';
import {defaultWagmiConfig} from '@web3modal/wagmi-react-native';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

dayjs.extend(duration);
const queryClient = new QueryClient();

// Wagmi Config
const chains = [lightlink];
export const walletClient = createWalletClient({
  chain: lightlink,
  account: ZERO_ADDRESS,
  transport: http(TESTNET_RPC_URL),
});
const connector = new MockConnector({
  chains,
  options: {
    chainId: 1891,
    walletClient,
  },
});
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: WC_PROJECT_ID,
  enableWalletConnect: false,
  extraConnectors: [connector],
});

const Providers = () => {
  return (
    <SafeAreaProvider>
      <WagmiConfig config={wagmiConfig as any}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={DarkTheme}>
            <NavigationContainer theme={DarkTheme}>
              <SettingsProvider>
                <WalletProvider>
                  <SessionProvider>
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
                  </SessionProvider>
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
