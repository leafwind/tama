/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['zh-TW'],
  catalogs: [
    {
      path: '<rootDir>/src/locale/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  format: 'po',
}
