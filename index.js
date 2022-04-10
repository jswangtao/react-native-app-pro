import {AppRegistry, LogBox} from 'react-native';
import App from './js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => {
  // 去warning
  // Ignore log notification by message:
  // LogBox.ignoreLogs(['^Warning']);
  // Ignore all log notifications:
  LogBox.ignoreAllLogs();

  // 是否预热webview
  global.__WEB_LOADED__ = true;

  if (__DEV__) {
    // console.warn('Start Javascript Hermes Engine:'+(global.HermesInternal != null));
  }
  return App;
});
