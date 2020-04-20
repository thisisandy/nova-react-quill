module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
"env": {
        "browser": true,
    },
    plugins: [
        "@typescript-eslint",
        "jest"
    ],
    "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
    extends: [
        "react-app",
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        "plugin:react/recommended",
        "plugin:jest/recommended",
        "plugin:jest/style",
        "airbnb",
        "airbnb/hooks"
    ],
    "rules": {
        'react/jsx-wrap-multilines': 'off',
        'react/jsx-indent': 'off',
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
        "import/prefer-default-export": 0,
        'import/named': 'off',
        'import/export': 'off',
        'import/extensions':'off',
        "no-undef": "error",
        "no-global-assign":"error",
        "no-implicit-globals": "error",
        "no-this-before-super":'error',
        "no-global-assign":"error",
        "@typescript-eslint/no-explicit-any":0
    }

};