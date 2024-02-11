module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        path: '.env',
        moduleName: '@env',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          app: './src/app',
          lib: './src/lib',
          data: './src/data',
          utils: './src/utils',
          hooks: './src/hooks',
          assets: './src/assets',
          config: './src/config',
          typings: './src/types',
          layouts: './src/layouts',
          helpers: './src/helpers',
          contracts: './src/contracts',
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
