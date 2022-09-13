/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import {
  InputText as ControlledInputText,
} from '@Molecules'


const ShippingBillingAddress = () => {
  return (
    <div>
      <div className="title">
        <span>ShippingBillingAddress</span>
      </div>
      <ControlledInputText
        placeholder="Name"
        name="name"
      // rules={rulesFields.name.rules}
      />

      <ControlledInputText
        type="email"
        name="email"
        placeholder="Email"
      // rules={rulesFields.email.rules}
      />

      <ControlledInputText
        type="password"
        name="password"
        placeholder="Password"
      // rules={rulesFields.password.rules}
      />
    </div>
  )
}

export default ShippingBillingAddress
