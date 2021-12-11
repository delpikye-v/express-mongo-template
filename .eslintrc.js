const isProd = process.env.NODE_ENV === 'production'
const ERROR = 2
const WARN = 1
const OFF = 0

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["airbnb-base", "prettier", "plugin:node/recommended"],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [ // customizing prettier rules
            'error',
            {
                semi: false,
                singleQuote: true,
                trailingComma: false,
                printWidth: 120,
                endOfLine:"auto"
            },
        ],
        'no-console': OFF, // adding some custom ESLint rules
        'no-debugger': isProd ? ERROR : OFF,
        'no-unused-vars': WARN
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
