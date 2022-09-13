/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import {
  HorizontalLinearStepper,
  ShippingDeliveryAddress,
  ShippingBillingAddress,
  ShippingPaymentMethod,
} from '@Molecules'

import { ShippingContext } from './shippingContext'

import { Props } from './type'

const Shipping: FC<Props> = ({
  submitHandler,
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext()

  const value = useContext(ShippingContext);

  console.log({ value })

  return (
    <div className="box" style={{ maxWidth: 'none' }}>
      <div className="title">
        <HorizontalLinearStepper handleBack={value?.handleBack} handleNext={value?.handleNext} page={value?.page} />
      </div>
      <form className="form">
        {value?.page === 0 && <ShippingDeliveryAddress />}
        {value?.page === 1 && <ShippingBillingAddress />}
        {value?.page === 2 && <ShippingPaymentMethod />}
        <button type="submit" onClick={handleSubmit(submitHandler)} disabled={isSubmitting}>
          {isSubmitting ? <span className="loader"></span> : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Shipping
