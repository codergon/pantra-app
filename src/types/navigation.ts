import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {TokenInstance} from './common';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootTabParamList,
        OnboardingStackParamList {}
  }
}

type modalScreens = {
  pairModal: undefined;
  editWallet: undefined;
  selectAvatar: undefined;
  signTxnModal: undefined;
  walletOptions: undefined;
  viewPassphrase: undefined;
  importWalletModal: undefined;
  selectActionModal: undefined;
  txnDetails: {txnHash: string};
};

export type RootTabParamList = {
  home: undefined;
  smartSave: undefined;
  tabBtn: undefined;
  signIn: undefined;
  transactions: undefined;

  settings: undefined;

  scanQR:
    | {
        scanAddress?: boolean;
      }
    | undefined;
  shareQR: {
    address: string;
  };
  NFTpreview: TokenInstance;

  // Passcode
  enterPasscode:
    | {
        isReset?: boolean;
      }
    | undefined;
  enterPasscodeInitial:
    | {
        isReset?: boolean;
      }
    | undefined;
  createPasscode: undefined;
  confirmPasscode: {
    codes: number[];
  };
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
  // Settings screeens
  wallets: undefined;
  security: undefined;
  sessions: undefined;
  currencies: undefined;
  preferences: undefined;

  // Process Transactions
  sendETH:
    | {
        toAddress?: string;
      }
    | undefined;

  // Passcode
  enterPasscode:
    | {
        isReset?: boolean;
      }
    | undefined;
  enterPasscodeInitial:
    | {
        isReset?: boolean;
      }
    | undefined;
  createPasscode: undefined;
  confirmPasscode: {
    codes: number[];
  };

  Loader: undefined;
  scanQR:
    | {
        scanAddress?: boolean;
      }
    | undefined;
  shareQR: {
    address: string;
  };
  NFTpreview: TokenInstance;
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type AppStackScreenProps<
  Screen extends keyof (RootStackParamList &
    OnboardingStackParamList &
    RootTabParamList),
> = NativeStackScreenProps<
  RootStackParamList & OnboardingStackParamList & RootTabParamList,
  Screen
>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
