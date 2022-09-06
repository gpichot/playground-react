const path = require("path");
module.exports = async ({ config }) => {
  config.resolve.alias["@"] = path.resolve(__dirname, "../src/");

  const { module = {} } = config;
  const newConfig = {
    ...config,
    module: {
      ...module,
      rules: [...(module.rules || [])],
    },
  };

  const cssLoaderRule = newConfig.module.rules.find(
    rule => rule?.test?.toString() === "/\\.css$/"
  );

  newConfig.module.rules.push({
    ...cssLoaderRule,
    test: /module\.scss$/,
    use: [
      ...cssLoaderRule.use.map(item => {
        if (!item?.loader?.match(/[\/\\]css-loader/g)) return item;

        return {
          ...item,
          options: {
            ...item.options,
            modules: true,
          },
        };
      }),
      "sass-loader",
    ],
    include: path.resolve(__dirname, "../"),
  });

  cssLoaderRule.exclude = /\.module\.scss$/;

  return newConfig;
};
