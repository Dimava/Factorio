// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    tsconfigPath: '**/tsconfig.json',
  },
  ignores: []
}, {
  files: ['**/scripts/**/*.ts'],
  rules: {
    
    'no-console': 'off',
  },
}, {
  ignores: ['eslint.config.js']
})
