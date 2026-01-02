import {useEffect} from 'react'
import {i18n} from '@lingui/core'

import {sanitizeAppLanguageSetting} from '#/locale/helpers'
import {AppLanguage} from '#/locale/languages'
import {useLanguagePrefs} from '#/state/preferences'

/**
 * We do a dynamic import of just the catalog that we need
 */
export async function dynamicActivate(locale: AppLanguage) {
  let mod: any

  switch (locale) {
    case AppLanguage.zh_TW: {
      mod = await import(`./locales/zh-TW/messages`)
      break
    }
    default: {
      mod = await import(`./locales/zh-TW/messages`)
      break
    }
  }

  i18n.load(locale, mod.messages)
  i18n.activate(locale)
}

export function useLocaleLanguage() {
  const {appLanguage} = useLanguagePrefs()
  useEffect(() => {
    const sanitizedLanguage =
      sanitizeAppLanguageSetting(appLanguage) || AppLanguage.zh_TW

    document.documentElement.lang = sanitizedLanguage
    dynamicActivate(sanitizedLanguage)
  }, [appLanguage])
}
