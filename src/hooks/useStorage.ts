import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseStateHook<T> = [T | null, (value?: T | null) => void, boolean];
type UseAsyncStateHook<T> = [
  T | null,
  (value?: T | null) => void,
  boolean,
  (value: boolean) => void,
];

function useAsyncState<T>(initialValue: T | null = null): UseAsyncStateHook<T> {
  const [state, setState] = React.useState<T | null>(initialValue);
  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (initialValue !== null) {
      setState(initialValue);
      setIsReady(true);
    }
  }, [initialValue]);

  return [state, setState as (value?: T | null) => void, isReady, setIsReady];
}

export async function storeStorageItemAsync(key: string, value: any) {
  if (value == null) {
    const val = await AsyncStorage.getItem(key);
    if (val) {
      await AsyncStorage.removeItem(key);
    }
  } else {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

export function useStorage<T>(key: string, defaultValue?: T): UseStateHook<T> {
  const [state, setState, isReady, setIsReady] = useAsyncState<T | null>(null);

  // Get
  React.useEffect(() => {
    AsyncStorage.getItem(key).then(value => {
      if (value !== undefined) {
        setState(value === null ? null : JSON.parse(value));
      }
      setIsReady(true);
    });
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: T | null = null) => {
      storeStorageItemAsync(key, value !== undefined ? value : null).then(
        () => {
          setState(value);
        },
      );
    },
    [key],
  );

  return [
    state !== undefined ? state : defaultValue || null,
    setValue,
    isReady,
  ];
}
