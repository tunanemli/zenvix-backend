/** @type {import('prettier').Config} */
export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  // Ekran/pencere genişliği Prettier’da yok: satır uzunluğu = (editörde gördüğün sütun) − 5.
  // Örn. Cursor’da ~120 sütun görüyorsan 115; daha geniş panelde 155 vb. yap.
  printWidth: 115,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
};
