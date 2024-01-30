import {useStorage} from 'hooks/useStorage';
import currencies from 'constants/currencies';
import ReactNativeBiometrics from 'react-native-biometrics';
import {createContext, useContext, useEffect, useState} from 'react';

const appBiometrics = new ReactNativeBiometrics();

export default function SettingsProvider({children}: SettingsProviderProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isBiometricsSupported, setIsBiometricsSupported] = useState(false);

  const [passcode, setPasscode] = useStorage<string>('passcode');

  const [settings, setSettings] = useStorage<ISettings>('settings', {
    privacy: false,
    passcode: false,
    biometrics: false,

    haptics: true,
    useJazzicons: true,
    activeCurrency: currencies[0],
  });

  // setPasscode();
  // setSettings();

  const updateSettings = async (
    key: keyof ISettings,
    value: ISettings[keyof ISettings],
  ) => {
    setSettings({...settings!, [key]: value});
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
        passcode,
        setPasscode,

        isAuthorized,
        biometricsAuth,
        isBiometricsSupported,

        useJazzicons: settings?.useJazzicons!,
        activeCurrency: settings?.activeCurrency!,

        settings,
        setSettings,
        updateSettings,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}

export type ISettings = {
  privacy: boolean;
  passcode: boolean;
  biometrics: boolean;
  haptics: boolean;
  useJazzicons: boolean;
  activeCurrency: (typeof currencies)[number];
};

interface SettingsContext {
  passcode: string | null;
  setPasscode: (value?: string | undefined) => void;

  isAuthorized: boolean;
  isBiometricsSupported: boolean;
  biometricsAuth: () => Promise<void>;

  useJazzicons: boolean;
  activeCurrency: (typeof currencies)[number];

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
