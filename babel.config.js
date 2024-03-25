module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@interface': './src/interface',
        }
      }
    ],
    'react-native-reanimated/plugin'
  ],
};
