import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {OwnedNft} from 'alchemy-sdk';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootTabParamList,
        OnboardingStackParamList {}
  }
}

export type SettingsStackParamList = {
  wallets: undefined;
  security: undefined;
  sessions: undefined;
  currencies: undefined;
  appSettings: undefined;
};

export type RootTabParamList = {
  home: undefined;
  vaults: undefined;
  activity: undefined;
  wallet: undefined;
  signIn: undefined;

  settings: NavigatorScreenParams<SettingsStackParamList> | undefined;

  scanQR: undefined;
  shareQR: undefined;
  NFTpreview: OwnedNft;

  pairModal: undefined;
  signTxnModal: undefined;
  selectAvatar: undefined;
  importWalletModal: undefined;
  txnDetails: {txnHash: string};
};

export type OnboardingStackParamList = {
  splash: undefined;
  addAccount: undefined;
  walletFromMnemonic: undefined;
  walletFromPrivateKey: undefined;
};

export type BottomSheetParams = {
  pairModal: undefined;
  selectAvatar: undefined;
  signTxnModal: undefined;
  importWalletModal: undefined;
  txnDetails: {txnHash: string};

  Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackParamList = {
  Loader: undefined;
  scanQR: undefined;
  shareQR: undefined;
  NFTpreview: OwnedNft;
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList> | undefined;
};

export type SettingsStackScreenProps<
  Screen extends keyof SettingsStackParamList,
> = NativeStackScreenProps<SettingsStackParamList, Screen>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AppStackScreenProps<
  Screen extends keyof (RootStackParamList &
    OnboardingStackParamList &
    RootTabParamList &
    SettingsStackParamList),
> = NativeStackScreenProps<
  RootStackParamList &
    OnboardingStackParamList &
    RootTabParamList &
    SettingsStackParamList,
  Screen
>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
