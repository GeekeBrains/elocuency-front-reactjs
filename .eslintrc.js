module.exports = {
  plugins: ['react', 'react-hooks'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': [
      'warn',
      {vars: 'all', args: 'after-used', ignoreRestSiblings: false},
    ],
  },
};
