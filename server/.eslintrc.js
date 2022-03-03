module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'standard'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true
    }
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true
      }
    ]
  }
}
