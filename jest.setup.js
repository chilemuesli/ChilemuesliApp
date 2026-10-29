import 'react-native-gesture-handler/jestSetup';

// Native modules are not available in Jest.
jest.mock('react-native-beacons-manager', () => ({
  __esModule: true,
  default: {
    BeaconsEventEmitter: {addListener: jest.fn(() => ({remove: jest.fn()}))},
    requestWhenInUseAuthorization: jest.fn(),
    requestAlwaysAuthorization: jest.fn(),
    startUpdatingLocation: jest.fn(),
    detectIBeacons: jest.fn(() => Promise.resolve()),
    startRangingBeaconsInRegion: jest.fn(() => Promise.resolve()),
    stopRangingBeaconsInRegion: jest.fn(() => Promise.resolve()),
    startMonitoringForRegion: jest.fn(() => Promise.resolve()),
  },
}));
jest.mock('react-native-bluetooth-state-manager', () => ({
  useBluetoothState: jest.fn(() => 'PoweredOn'),
}));
jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {WELCOME_URL: 'https://example.invalid'},
}));
jest.mock('react-native-webview', () => ({WebView: 'WebView'}));
jest.mock('react-native-video', () => 'Video');
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/documents',
  MainBundlePath: '/bundle',
  readFile: jest.fn(() => Promise.resolve('[]')),
  readDir: jest.fn(() => Promise.resolve([])),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
  },
}));
jest.mock('react-native-email-link', () => ({openComposer: jest.fn()}));
jest.mock('react-native-open-maps', () => jest.fn());
jest.mock('react-native-vector-icons/FontAwesome', () => {
  const Icon = () => null;
  Icon.loadFont = jest.fn();
  return {__esModule: true, default: Icon};
});
jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const Icon = () => null;
  Icon.loadFont = jest.fn();
  return {__esModule: true, default: Icon};
});
