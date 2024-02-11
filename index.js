import 'react-native-get-random-values';
import '@ethersproject/shims';

import 'react-native-url-polyfill/auto';
import '@walletconnect/react-native-compat';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppProviders from './src/providers/Providers';

TimeAgo.addDefaultLocale(en);

AppRegistry.registerComponent(appName, () => AppProviders);
