const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro Konfiguration für React Native
 */
const config = {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx'],
    platforms: ['android', 'ios']
  },
  server: {
    port: 8081,
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // Umleitung für alte Bundle-URL
        if (req.url.includes('index.android.bundle')) {
          req.url = req.url.replace('index.android.bundle', 'index.bundle');
        }
        return middleware(req, res, next);
      };
    }
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  }
};

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const metroConfig = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
