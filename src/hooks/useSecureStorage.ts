import * as React from 'react';
import SecureStore from 'react-native-encrypted-storage';

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

export async function storeSecureItemAsync(key: string, value: any) {
  if (value == null) {
    await SecureStore.removeItem(key);
  } else {
    await SecureStore.setItem(key, JSON.stringify(value));
  }
}

export function useSecureStorage<T>(key: string): UseStateHook<T> {
  const [state, setState, isReady] = useAsyncState<T | null>(null);

  // Get
  React.useEffect(() => {
    (async () => {
      await SecureStore.getItem(key)
        .then(value => {
          if (value !== undefined)
            setState(value === null ? null : JSON.parse(value));
        })
        .catch((e: any) => {
          console.log('Error: ', e);
        });
    })();
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: T | null = null) => {
      storeSecureItemAsync(key, value || null).then(() => {
        setState(value);
      });
    },
    [key],
  );

  return [state, setValue, isReady];
}
