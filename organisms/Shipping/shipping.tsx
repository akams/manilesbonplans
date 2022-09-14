import { FC, useContext } from 'react'

import {
  HorizontalLinearStepper,
  ShippingDeliveryAddress,
  ShippingPaymentMethod,
} from '@Molecules'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { ShippingContext } from './shippingContext'

import { Props } from './type'

const Shipping: FC<Props> = ({
  submitHandler,
}) => {
  const value = useContext(ShippingContext);

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
        {value?.page === 1 && <ShippingPaymentMethod />}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {value?.page !== 0 && <Button
            color="inherit"
            disabled={value?.page === 0}
            onClick={() => value?.handleBack()}
            sx={{ mr: 1 }}
            style={{ ...styles.btn, ...styles.color }}
          >
            Retour
          </Button>}
          <Box sx={{ flex: '1 1 auto' }} />
          {value?.page < value?.steps.length - 1 && (
            <Button style={styles.btn} onClick={() => value?.handleNext()}>
              Continuer
            </Button>)}
        </Box>
      </form>
    </div>
  )
}

export default Shipping
