const glob = require("glob");
const path = require("path");

const appDirectory = path.resolve(__dirname, "../src");
const getStories = () =>
  glob.sync(`${appDirectory}/**/*.stories.@(js|jsx|ts|tsx|mdx)`, {
    ignore: process.env.SHOW_ALL_STORIES
      ? ""
      : `${appDirectory}/features/common/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
  });

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: async list => [...list, ...getStories()],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};
