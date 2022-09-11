import * as locales from '@Locale'

//@ts-ignore
export const translationKeyExist = (key: string | unknown, locale: string, translation = locales) => translation[locale]?.hasOwnProperty(key as string)

export const displayTranslatedError = (key: string | unknown, locale: string, callback: any) => (translationKeyExist(key, locale) ? callback() : key)
