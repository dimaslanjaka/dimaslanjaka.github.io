module.exports = {
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    semi: true,
    singleQuote: false,
    trailingComma: 'es5',
    endOfLine: 'lf',
    quoteProps: 'as-needed',
    overrides: [
        {
            excludeFiles: ['*.min.js', '*.min.css', '*.min.html', '*.min.scss'],
            files: ['*.js', '*.css', '*.sass', '*.html', '*.md', '*.ts'],
            options: {
                semi: true,
            },
        },
    ],
};
