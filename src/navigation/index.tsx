import Colors from 'constants/appColors';
import useColorScheme from 'hooks/useColorScheme';
import {RgText} from 'components/_ui/typography';
import {ColorSchemeName, View} from 'react-native';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomSheetNavigator} from '@th3rdwave/react-navigation-bottom-sheet';
import {
  BottomSheetParams,
  RootTabParamList,
  RootStackParamList,
} from 'typings/navigation';
import {
  House,
  Users,
  CirclesThreePlus,
  SlidersHorizontal,
  ClockCounterClockwise,
} from 'phosphor-react-native';

// Screens
import Home from 'app/home';
import More from 'app/more';
import Vaults from 'app/vaults';
import Activity from 'app/activity';
import Onboarding from 'app/onboarding';
import Loader from 'components/_common/Loader';
import SelectAvatar from 'app/modals/selectAvatar';
import ImportWalletModal from 'app/modals/importWallet';
import CustomBackground from 'components/modals/custombackground';

// Navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BottomSheet = createBottomSheetNavigator<BottomSheetParams>();

// BottomTab Icons
function TabBarIcon(props: {label: string; color: string; focused: boolean}) {
  const iconSize = 26;

  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        gap: 4,
        flex: 1,
        minWidth: 40,
        paddingTop: 10,
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      {props.label === 'home' ? (
        <House
          weight={props?.focused ? 'fill' : 'regular'}
          size={iconSize}
          color={props?.color}
        />
      ) : props.label === 'vaults' ? (
        <Users
          weight={props?.focused ? 'fill' : 'regular'}
          size={iconSize}
          color={props?.color}
        />
      ) : props.label === 'activity' ? (
        <ClockCounterClockwise
          weight={props?.focused ? 'fill' : 'regular'}
          size={iconSize}
          color={props?.color}
        />
      ) : props.label === 'more' ? (
        <SlidersHorizontal
          weight={props?.focused ? 'fill' : 'regular'}
          size={iconSize}
          color={props?.color}
        />
      ) : (
        <>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 34,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}>
            <CirclesThreePlus size={20} color={'#000'} weight="regular" />
          </View>
        </>
      )}

      <RgText
        style={{
          display: props?.label === 'wallet' ? 'none' : 'none',

          fontSize: 10,
          color: props?.focused ? Colors[colorScheme].tint : '#89919E',
        }}>
        {props?.label?.charAt(0).toUpperCase() + props?.label?.slice(1)}
      </RgText>
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
  return (
    <BottomSheet.Navigator
      initialRouteName="Root"
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
          backgroundComponent: props => <CustomBackground {...props} />,
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
      <Stack.Screen name="Loader" component={Loader} />

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
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 88,
          borderTopWidth: 0.5,
          borderTopColor: '#222',
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
        name="vaults"
        component={Vaults}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="vaults" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="wallet"
        component={Home}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="wallet" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="activity"
        component={Activity}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="activity" color={color} focused={focused} />
          ),
        })}
      />

      <BottomTab.Screen
        name="more"
        component={More}
        options={() => ({
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon label="more" color={color} focused={focused} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
