import { FC } from 'react'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { LogoIcon } from '@Assets/icons'
import { validateEmail, validatePassword } from '@Utils/formValidation'
import { InputText as ControlledInputText } from '@Molecules'

import { Props } from './type'

const SignIn: FC<Props> = ({
  submitHandler,
  serverErrorMessage,
}) => {
  const { formatMessage } = useIntl()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext()

  const rulesFields = {
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
      {serverErrorMessage && (
        <div className="server">{serverErrorMessage}</div>
      )}
      <form className="form">
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
          {isSubmitting ? <span className="loader"></span> : 'Sign In'}
        </button>
      </form>
      <p className="info">
        Don t have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  )
}

export default SignIn
