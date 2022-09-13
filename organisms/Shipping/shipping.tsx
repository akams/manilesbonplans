/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { InputText as ControlledInputText } from '@Molecules'

import { LogoIcon } from '@Assets/icons'
import { validateEmail, validatePassword } from '@Utils/formValidation'

import { Props } from './type'

const Shipping: FC<Props> = ({
  submitHandler,
}) => {
  const router = useRouter()
  const { formatMessage } = useIntl()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext()



  const rulesFields = {
    name: {
      rules: {
        required: true,
      },
    },
    email: {
      rules: {
        required: true,
        validate: {
          'error.email-field': (value: string) => {
            if (!validateEmail(value)) {
              return formatMessage({ id: 'error.email-field' })
            }
            return true
          },
        },
      },
    },
    password: {
      rules: {
        required: true,
        validate: {
          'error.password-field': (value: string) => {
            if (!validatePassword(value)) {
              return formatMessage({ id: 'error.password-field' })
            }
            return true
          },
        },
      },
    },
  }

  return (
    <div className="box">
      <div className="title">
        <LogoIcon />
      </div>
      <form className="form">
        <ControlledInputText
          placeholder="Name"
          name="name"
          rules={rulesFields.name.rules}
        />

        <ControlledInputText
          type="email"
          name="email"
          placeholder="Email"
          rules={rulesFields.email.rules}
        />

        <ControlledInputText
          type="password"
          name="password"
          placeholder="Password"
          rules={rulesFields.password.rules}
        />
        <button type="submit" onClick={handleSubmit(submitHandler)} disabled={isSubmitting}>
          {isSubmitting ? <span className="loader"></span> : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Shipping
