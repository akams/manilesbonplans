// @ts-nocheck
import { RegisterOptions } from 'react-hook-form'
import { IntlShape } from 'react-intl'

type NativeRulesType = {
  name: string;
  message: string;
}

export const hydrateNativeRulesWithErrorMessages = (rules: RegisterOptions, formatMessage: IntlShape['formatMessage']) => {
  const nativeRules = [
    {
      name: 'required',
      message: 'error.required-field',
    },
  ]

  const nativeRulesKeys = new Set(nativeRules.map(({ name }) => name))

  return Object.entries(rules).reduce<RegisterOptions>((acc, [key, value]) => {
    if (nativeRulesKeys.has(key)) {
      const { name, message } = nativeRules.find(({ name }) => name === key) as NativeRulesType // because nativeRules find name can be undefined

      if (name === 'required' && value) {
        return {
          ...acc,
          [key]: formatMessage({ id: message }),
        }
      }

      return {
        ...acc,
        [key]: {
          value,
          message: formatMessage({ id: message }, { [key]: value }),
        },
      }
    }

    return {
      ...acc,
      [key]: value,
    }
  }, {})
}
