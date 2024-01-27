import Currencies from './currencies';
import AppSettings from './appSettings';
import {SettingsStackParamList} from 'typings/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ActiveSessions from './activeSessions';

const Settings = () => {
  const Stack = createNativeStackNavigator<SettingsStackParamList>();

  return (
    <>
      <Stack.Navigator
        initialRouteName="appSettings"
        screenOptions={{headerShown: false, gestureEnabled: true}}>
        <Stack.Screen name="appSettings" component={AppSettings} />
        <Stack.Screen name="currencies" component={Currencies} />
        <Stack.Screen name="sessions" component={ActiveSessions} />
      </Stack.Navigator>
    </>
  );
};

export default Settings;
