module.exports = {
  dependencies: {
    // Nitro modules (no TurboModule codegen output): stop autolinking from looking for a
    // codegen CMake library (it would fail with 'BluetoothStateManager.h not found').
    'react-native-bluetooth-state-manager': {
      platforms: {
        android: {
          libraryName: null,
          cmakeListsPath: null,
        },
      },
    },
    'react-native-nitro-modules': {
      platforms: {
        android: {
          libraryName: null,
          cmakeListsPath: null,
        },
      },
    },
  },
};
