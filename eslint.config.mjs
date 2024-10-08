// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
}, {
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    'no-console': 'off',
  },
})
