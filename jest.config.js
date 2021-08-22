module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  testRegex: "/src/.*.spec.ts$",
};
