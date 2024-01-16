module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'off',
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
  },
  parser: '@babel/eslint-parser',
};
