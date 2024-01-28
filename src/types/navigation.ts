import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {IWallet} from './common';
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

type modalScreens = {
  pairModal: undefined;
  selectAvatar: undefined;
  signTxnModal: undefined;
  importWalletModal: undefined;
  txnDetails: {txnHash: string};
  editWallet: {wallet: IWallet};
  walletOptions: {wallet: IWallet};
  viewPassphrase: {wallet: IWallet};
};

export type RootTabParamList = {
  home: undefined;
  vaults: undefined;
  wallet: undefined;
  signIn: undefined;
  activity: undefined;

  settings: NavigatorScreenParams<SettingsStackParamList> | undefined;

  scanQR: undefined;
  shareQR: {
    address: string;
  };
  NFTpreview: OwnedNft;
} & modalScreens;

export type OnboardingStackParamList = {
  splash: undefined;
  addAccount: undefined;
  walletFromMnemonic: undefined;
  walletFromPrivateKey: undefined;
};

export type BottomSheetParams = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
} & modalScreens;

export type RootStackParamList = {
  Loader: undefined;
  scanQR: undefined;
  shareQR: {
    address: string;
  };
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
