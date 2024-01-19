import {
  NavigationProp,
  NavigatorScreenParams,
  CompositeScreenProps,
} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootTabParamList,
        OnboardingStackParamList {}
  }
}

export type RootTabParamList = {
  home: undefined;
  vaults: undefined;
  activity: undefined;
  more: undefined;
  wallet: undefined;
  signIn: undefined;

  pairModal: undefined;
  signTxnModal: undefined;
  selectAvatar: undefined;
  importWalletModal: undefined;
};

export type OnboardingStackParamList = {
  splash: undefined;
  addAccount: undefined;
  walletFromMnemonic: undefined;
  walletFromPrivateKey: undefined;
};

export type BottomSheetParams = {
  selectAvatar: undefined;
  importWalletModal: undefined;
  pairModal: undefined;
  signTxnModal: undefined;

  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList> | undefined;
};

export type RootStackParamList = {
  Loader: undefined;
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
