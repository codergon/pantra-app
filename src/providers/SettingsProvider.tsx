import {useStorage} from 'hooks/useStorage';
import currencies from 'constants/currencies';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

const appBiometrics = new ReactNativeBiometrics();

export default function SettingsProvider({children}: SettingsProviderProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isBiometricsSupported, setIsBiometricsSupported] = useState(false);

  const [settings, setSettings] = useStorage<ISettings>('settings', {
    privacy: 'off',
    activeCurrency: currencies[0],
  });

  const setActiveCurrency = async (currency: (typeof currencies)[number]) => {
    setSettings({...settings!, activeCurrency: currency});
  };

  const updateSettings = async (
    key: keyof ISettings,
    value: ISettings[keyof ISettings],
  ) => {
    setSettings({...settings!, [key]: value});
    await AsyncStorage.setItem(
      'settings',
      JSON.stringify({...settings, [key]: value}),
    );
  };

  useEffect(() => {
    // biometricsAuth();
  }, []);

  const biometricsAuth = async () => {
    try {
      let {available, biometryType} = await appBiometrics.isSensorAvailable();
      if (!available) return;
      setIsBiometricsSupported(available);

      let {success} = await appBiometrics.simplePrompt({
        promptMessage: 'Sign in with Touch ID',
      });
      if (success) {
        setIsAuthorized(true);
      }
    } catch (error) {}
  };

  return (
    <SettingsContext.Provider
      value={{
        activeCurrency: settings?.activeCurrency!,
        setActiveCurrency,

        isAuthorized,
        biometricsAuth,
        isBiometricsSupported,

        settings,
        setSettings,
        updateSettings,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}

export type ISettings = {
  privacy: 'on' | 'off';
  activeCurrency: (typeof currencies)[number];
};

interface SettingsContext {
  activeCurrency: (typeof currencies)[number];
  setActiveCurrency: (currency: (typeof currencies)[number]) => void;

  isAuthorized: boolean;
  isBiometricsSupported: boolean;
  biometricsAuth: () => Promise<void>;

  settings: ISettings | null;
  updateSettings: (
    key: keyof ISettings,
    value: ISettings[keyof ISettings],
  ) => void;
  setSettings: (value?: ISettings | undefined) => void;
}

export const SettingsContext = createContext({} as SettingsContext);

interface SettingsProviderProps {
  children: React.ReactNode;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAccount must be wrapped in a <SettingsProvider />');
    }
  }

  return value;
}
