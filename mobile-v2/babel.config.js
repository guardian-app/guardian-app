module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['inline-dotenv', 'transform-inline-environment-variables', 'react-native-paper/babel']
  };
};