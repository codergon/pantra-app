import {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const useClipboard = (): [boolean, (text: string) => void] => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string, cb?: () => void) => {
    setCopied(true);
    Clipboard.setString(text);

    setTimeout(() => {
      setCopied(false);
      cb && cb();
    }, 1300);
  };

  return [copied, copyToClipboard];
};

export default useClipboard;
