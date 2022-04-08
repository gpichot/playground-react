const path = require("path");
module.exports = async ({ config, mode }) => {
  config.resolve.alias["@"] = path.resolve(__dirname, "../src/");

  config.module.rules.push({
    test: /module\.scss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: { modules: true },
      },
      "sass-loader",
    ],
    include: path.resolve(__dirname, "../"),
  });

  return config;
};
