// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    // Your custom configs here
    {
      rules: {
        quotes: ['error', 'single'],
        'no-multiple-empty-lines': [ 'error', {
          'max': 1,
          'maxEOF': 1
        }],
        'array-bracket-newline': [
          'error',
          {
            multiline: true,
            minItems: 1
          }
        ],
        'comma-dangle': [
          'error',
          'always-multiline'
        ],
        'object-curly-spacing': [
          'error',
          'always'
        ],
        'block-spacing': [
          'error',
          'always'
        ],
        'space-before-blocks': [
          'error',
          'always'
        ],
        indent: [
          'error',
          4,
          {
            offsetTernaryExpressions: true,
            SwitchCase: 1
          }
        ]
      }
    }
)
