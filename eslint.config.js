// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    tsconfigPath: '**/tsconfig.json',
  },
}, {
  files: ['**/scripts/**/*.ts'],
  rules: {
    'no-console': 'off',
  },
})
