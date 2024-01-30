import TabIcon from './tabIcons';
import {View} from 'react-native';
import Colors, {colors} from 'utils/Theming';
import {Text} from 'components/_ui/typography';
import useColorScheme from 'hooks/useColorScheme';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomSheetNavigator} from '@th3rdwave/react-navigation-bottom-sheet';
import {
  RootTabParamList,
  BottomSheetParams,
  RootStackParamList,
} from 'typings/navigation';

// Screens
import Home from 'app/home';
import ScanQR from 'app/scanQR';
import Loader from 'app/Loader';
import ShareQR from 'app/shareQR';
import Settings from 'app/settings';
import SmartSave from 'app/smartSave';
import Onboarding from 'app/onboarding';
import NFTPreview from 'app/NFTPreview';
import PairModal from 'app/modals/pairModal';
import SignTxnModal from 'app/modals/signTxn';
import SelectAvatar from 'app/modals/selectAvatar';
import ImportWalletModal from 'app/modals/importWallet';
import TxnDetailsModal from 'app/modals/txnDetailsModal';
import EditWalletModal from 'app/modals/editWalletModal';
import PassphraseModal from 'app/modals/passphraseModal';
import WalletOptionsModal from 'app/modals/walletOptionsModal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomBackground from 'components/modals/customBackground';

import Wallets from 'app/settings/wallets';
import Transactions from 'app/transactions';
import Currencies from 'app/settings/currencies';
import Preferences from 'app/settings/preferences';
import SecuritySettings from 'app/settings/security';
import EnterPasscode from 'app/passcode/enterPasscode';
import ActiveSessions from 'app/settings/activeSessions';
import CreatePasscode from 'app/passcode/createPasscode';
import ConfirmPasscode from 'app/passcode/confirmPasscode';

// Navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BottomSheet = createBottomSheetNavigator<BottomSheetParams>();

// BottomTab Icons
function TabBarIcon(props: {label: string; color: string; focused: boolean}) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        gap: 4,
        minWidth: 40,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: props.label === 'tabBtn' ? 0 : 8,
      }}>
      <TabIcon
        label={props.label}
        color={props.color}
        focused={props.focused}
      />

      {props.label !== 'tabBtn' && (
        <Text
          style={{
            fontSize: 10,
            lineHeight: 13,
            color: props?.focused
              ? Colors[colorScheme].tint
              : Colors[colorScheme].tabIconDefault,
          }}>
          {props.label === 'smartSave'
            ? 'Smart Save'
            : props?.label?.charAt(0).toUpperCase() + props?.label?.slice(1)}
        </Text>
      )}
    </View>
  );
}

// Navigation Container
export default function Navigation() {
  return (
    <>
      <BottomSheetNavigator />
    </>
  );
}

// Bottom Sheet Navigator
const BottomSheetNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet.Navigator
      initialRouteName="pairModal"
      screenOptions={{
        backdropComponent: props => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        ),
      }}>
      <BottomSheet.Screen name="Root" component={RootNavigator} />

      {/* View Passphrase */}
      <BottomSheet.Screen
        name="viewPassphrase"
        component={PassphraseModal}
        options={{
          detached: true,
          snapPoints: [420],
          topInset: insets.top,
          enableOverDrag: false,
          handleComponent: null,
          bottomInset: insets.bottom,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />

      {/* Edit Wallet */}
      <BottomSheet.Screen
        name="walletOptions"
        component={WalletOptionsModal}
        options={{
          detached: true,
          snapPoints: [350],
          enableOverDrag: false,
          bottomInset: insets.bottom,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />
      <BottomSheet.Screen
        name="editWallet"
        component={EditWalletModal}
        options={{
          detached: true,
          snapPoints: [330],
          enableOverDrag: false,
          handleComponent: null,
          bottomInset: insets.bottom,
          style: {marginHorizontal: 16},
          keyboardBlurBehavior: 'restore',
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />

      {/* Acct Setup */}
      <BottomSheet.Screen
        name="selectAvatar"
        component={SelectAvatar}
        options={{
          handleHeight: 0,
          snapPoints: ['46%'],
          handleComponent: null,
          backdropComponent: null,
          enableDismissOnClose: false,
          enablePanDownToClose: false,
          backgroundComponent: props => <CustomBackground {...props} />,
        }}
      />

      <BottomSheet.Screen
        name="importWalletModal"
        component={ImportWalletModal}
        options={{
          snapPoints: [226],
          enableOverDrag: true,
          overDragResistanceFactor: 3,
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => <CustomBackground {...props} />,
        }}
      />

      <BottomSheet.Screen
        name="txnDetails"
        component={TxnDetailsModal}
        options={{
          detached: true,
          snapPoints: [420],
          handleComponent: null,
          enableOverDrag: false,
          bottomInset: insets.bottom,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />

      {/* Wallet Action modals */}
      <BottomSheet.Screen
        name="pairModal"
        component={PairModal}
        options={{
          detached: true,
          snapPoints: [330],
          enableOverDrag: false,
          handleComponent: null,
          backdropComponent: null,
          bottomInset: insets.bottom,
          enableDismissOnClose: false,
          enablePanDownToClose: false,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />

      <BottomSheet.Screen
        name="signTxnModal"
        component={SignTxnModal}
        options={{
          detached: true,
          snapPoints: [640],
          topInset: insets.top,
          enableOverDrag: false,
          handleComponent: null,
          backdropComponent: null,
          bottomInset: insets.bottom,
          enableDismissOnClose: false,
          enablePanDownToClose: false,
          style: {marginHorizontal: 16},
          handleIndicatorStyle: {backgroundColor: colors.modalHandle},
          backgroundComponent: props => (
            <CustomBackground borderRadius={12} {...props} />
          ),
        }}
      />
    </BottomSheet.Navigator>
  );
};

//  Root Navigator
function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="enterPasscode" component={EnterPasscode} />
        <Stack.Screen name="createPasscode" component={CreatePasscode} />
        <Stack.Screen name="confirmPasscode" component={ConfirmPasscode} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="wallets" component={Wallets} />
        <Stack.Screen name="currencies" component={Currencies} />
        <Stack.Screen name="preferences" component={Preferences} />
        <Stack.Screen name="sessions" component={ActiveSessions} />
        <Stack.Screen name="security" component={SecuritySettings} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name="shareQR"
          component={ShareQR}
          options={{presentation: 'modal', animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="scanQR"
          component={ScanQR}
          options={{presentation: 'modal', animation: 'slide_from_bottom'}}
        />
      </Stack.Group>

      <Stack.Screen name="Loader" component={Loader} />
      <Stack.Screen name="NFTpreview" component={NFTPreview} />

      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="smartSave"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 88,
          borderTopWidth: 0.5,
          borderTopColor: '#1c1c1c',
          backgroundColor: Colors[colorScheme].tabBackground,
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
      }}>
      <BottomTab.Screen
        name="home"
        component={Home}
        options={() => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="home" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="smartSave"
        component={SmartSave}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="smartSave" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="tabBtn"
        component={SmartSave}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="tabBtn" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="transactions"
        component={Transactions}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="transactions" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="settings"
        component={Settings}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="settings" color={color} focused={focused} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
