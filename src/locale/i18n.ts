// Don't remove -force from these because detection is VERY slow on low-end Android.
// https://github.com/formatjs/formatjs/issues/4463#issuecomment-2176070577
import '@formatjs/intl-locale/polyfill-force'
import '@formatjs/intl-pluralrules/polyfill-force'
import '@formatjs/intl-numberformat/polyfill-force'
import '@formatjs/intl-displaynames/polyfill-force'
import '@formatjs/intl-pluralrules/locale-data/en'
import '@formatjs/intl-numberformat/locale-data/en'
import '@formatjs/intl-displaynames/locale-data/en'

import {useEffect} from 'react'
import {i18n} from '@lingui/core'

import {sanitizeAppLanguageSetting} from '#/locale/helpers'
import {AppLanguage} from '#/locale/languages'
import {messages as messagesZh_TW} from '#/locale/locales/zh-TW/messages'
import {useLanguagePrefs} from '#/state/preferences'

/**
 * We do a dynamic import of just the catalog that we need
 */
export async function dynamicActivate(locale: AppLanguage) {
  switch (locale) {
    case AppLanguage.zh_TW: {
      i18n.loadAndActivate({locale, messages: messagesZh_TW})
      await Promise.all([
        import('@formatjs/intl-pluralrules/locale-data/zh'),
        import('@formatjs/intl-numberformat/locale-data/zh'),
        import('@formatjs/intl-displaynames/locale-data/zh'),
      ])
      break
    }
    default: {
      i18n.loadAndActivate({locale, messages: messagesZh_TW})
      break
    }
  }
}

export function useLocaleLanguage() {
  const {appLanguage} = useLanguagePrefs()
  useEffect(() => {
    dynamicActivate(sanitizeAppLanguageSetting(appLanguage))
  }, [appLanguage])
}
