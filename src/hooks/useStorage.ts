import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseStateHook<T> = [T | null, (value?: T | null) => void, boolean];

function useAsyncState<T>(initialValue: T | null = null): UseStateHook<T> {
  const [state, setState] = React.useState<T | null>(initialValue);
  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (initialValue !== null) {
      setState(initialValue);
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [initialValue]);

  return [state, setState as (value?: T | null) => void, isReady];
}

export async function storeStorageItemAsync(key: string, value: any) {
  if (value == null) {
    await AsyncStorage.removeItem(key);
  } else {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

export function useStorage<T>(key: string, defaultValue?: T): UseStateHook<T> {
  const [state, setState, isReady] = useAsyncState<T | null>(null);

  // Get
  React.useEffect(() => {
    AsyncStorage.getItem(key).then(value => {
      setState(value === null ? null : JSON.parse(value));
    });
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: T | null = null) => {
      storeStorageItemAsync(key, value || null).then(() => {
        setState(value);
      });
    },
    [key],
  );

  return [state || defaultValue || null, setValue, isReady];
}
