module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          app: './src/app',
          lib: './src/lib',
          utils: './src/utils',
          hooks: './src/hooks',
          assets: './src/assets',
          config: './src/config',
          typings: './src/types',
          layouts: './src/layouts',
          helpers: './src/helpers',
          providers: './src/providers',
          constants: './src/constants',
          navigation: './src/navigation',
          components: './src/components',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
