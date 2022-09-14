import React from 'react'
import { Controller, FieldValues, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { displayTranslatedError } from '@Utils/translation'
import { hydrateNativeRulesWithErrorMessages } from '../nativeReactHookFormRules'

import {
  InputTextControlledPropsType,
} from './types'

function InputText({
  name,
  rules,
  label,
  disabled = false,
  ...otherProps
}: InputTextControlledPropsType) {
  const {
    control, formState: {
      errors,
    }, watch,
  } = useFormContext()
  const { formatMessage } = useIntl()
  const router = useRouter()
  //@ts-ignore
  const { local, defaultLocale } = router
  const watchedDefaultValue = watch(name)

  const requiredLabel = rules?.required ? ' *' : ''
  const rulesEnhanced = rules ? hydrateNativeRulesWithErrorMessages(rules, formatMessage) : {}

  return (
    <Controller
      name={name}
      control={control}
      rules={rulesEnhanced}
      defaultValue={watchedDefaultValue}
      render={({
        field,
      }: FieldValues) => {
        return (
          <div
            className={`form-control ${errors?.[field.name]?.message ? 'error' : ''} `}
          >
            {label && <label htmlFor={label}>{`${label}${requiredLabel}`}</label>}
            <input
              id={label}
              disabled={disabled}
              {...field}
              {...otherProps}
            />
            {errors?.[field.name] && <span className="hint">
              {/* @ts-ignore */}
              {displayTranslatedError(errors?.[field.name]?.message, local ?? defaultLocale, () => formatMessage({ id: errors?.[field.name]?.message }))}
            </span>}
          </div>
        )
      }}
    />
  )
}

export default InputText
