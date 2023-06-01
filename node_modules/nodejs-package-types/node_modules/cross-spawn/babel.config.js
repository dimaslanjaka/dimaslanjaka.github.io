module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        /*[
            "@moxy/babel-preset/lib",
            {
                lodash: false,
            },
        ],*/
        '@babel/preset-typescript',
    ],
};
