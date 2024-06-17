module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:import/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'import'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'error',
      {
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],

        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@api/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@assets/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@components/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@hooks/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@pages/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@query/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@redux/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@routes/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@utils/*',
            group: 'internal',
            position: 'after'
          }
        ],

        pathGroupsExcludedImportTypes: ['@tanstack*'],
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  }
};
