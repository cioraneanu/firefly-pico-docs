# Steps

1. Find a flag svg file for your language and place it inside `front/assets/icons/flags/xx.svg`
2. Add the new language to `languageCode` and `supportedLanguages` inside `front/i18n/index.js`
3. Create a json dictionary file that **i18n** supports inside `front/i18n/locales/xx.json` (copy `en.json` and translate it)
4. Update `front/plugins/plugin-date-fns.js` to make date relating names aware of the new language
