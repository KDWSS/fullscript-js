module.exports = function (api) {
  api.cache(true);
  const presets = [
    {
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            corejs: "3.32",
          },
        ],
        ["@babel/preset-typescript"],
      ],
    },
  ];

  return {
    presets,
  };
};
