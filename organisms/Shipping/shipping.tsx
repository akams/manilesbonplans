import { FC, useContext } from 'react'

import {
  HorizontalLinearStepper,
  ShippingDeliveryAddress,
  OrderPlaced,
} from '@Molecules'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useFormContext } from 'react-hook-form'

import { ShippingContext } from './shippingContext'

import { Props } from './type'

const Shipping: FC<Props> = ({
  submitHandlerForm,
}) => {
  const value = useContext(ShippingContext);
  const {
    trigger,
    getValues,
  } = useFormContext()

  const shippingFormSubmitHandler = async () => {
    const formIsValid = await trigger()
    const formValue = getValues()
    if (formIsValid) {
      await submitHandlerForm(formValue)
      value?.handleNext()
    }
  }

  const styles = {
    btn: {
      width: '20%'
    },
    color: {
      color: 'rgba(0, 0, 0, 0.26)',
      background: 'none',
    },
  }
  return (
    <div className="box" style={{ maxWidth: 'none' }}>
      <div className="title">
        <HorizontalLinearStepper steps={value?.steps} page={value?.page} />
      </div>
      <form className="form">
        {value?.page === 0 && <ShippingDeliveryAddress />}
        {value?.page === 1 && <OrderPlaced />}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          {value?.page < value?.steps.length - 1 && (
            <Button className='button' style={styles.btn} onClick={() => shippingFormSubmitHandler()}>
              Continuer
            </Button>)}
        </Box>
      </form>
    </div>
  )
}

export default Shipping
