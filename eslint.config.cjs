const eslintConfigLove = require('eslint-config-love')
const unusedImports = require('eslint-plugin-unused-imports')
module.exports = [
  eslintConfigLove,

  {
    files: ['**/*.js', '**/*.ts'],
    ignores: ['**/*.test.js', '**/*.test.ts'],
    plugins: {
      'unused-imports': unusedImports
    }
    // You can add more configuration options here if needed
  }
]
