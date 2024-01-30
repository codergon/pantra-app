import {trigger} from 'react-native-haptic-feedback';
import {useSettings} from 'providers/SettingsProvider';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

type HapticFeedbackTypes =
  | 'soft'
  | 'rigid'
  | 'impactHeavy'
  | 'impactLight'
  | 'impactMedium'
  | 'notificationError'
  | 'notificationSuccess'
  | 'notificationWarning';

const useHaptics = () => {
  const {settings} = useSettings();

  const hapticFeedback = (type: HapticFeedbackTypes = 'impactMedium') => {
    if (!settings?.haptics) return;
    trigger(type, options);
  };

  return hapticFeedback;
};

export default useHaptics;
