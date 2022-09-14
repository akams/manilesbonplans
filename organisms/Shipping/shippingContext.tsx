import React, { useState, createContext } from 'react'

export const ShippingContext = createContext({})

export const ShippingContextProvider = (props) => {
  const { deliveryAddress, billingAddress, isSame } = props
  const [shippingInfo, setlabelInfo] = useState({
    deliveryAddress: {
      ...deliveryAddress,
    },
    billingAddress: {
      ...billingAddress,
    },
    isSame,
  })

  // const steps = ['Adresse de livraison', 'Adresse de facturation', 'Mode de paiement']
  const steps = ['Adresse de livraison', 'Mode de paiement']
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  console.log('page', activeStep)
  const handleChange = (prop) => (event) => {
    setlabelInfo({ ...shippingInfo, [prop]: event.target.value })
  }

  const setSenderInfo = (prop) => (event) => {
    setlabelInfo({
      ...shippingInfo,
      deliveryAddress: { ...shippingInfo.deliveryAddress, [prop]: event.target.value },
    })
  }
  const setRecevierInfo = (prop) => (event) => {
    setlabelInfo({
      ...shippingInfo,
      billingAddress: { ...shippingInfo.billingAddress, [prop]: event.target.value },
    })
  }

  return (
    <ShippingContext.Provider
      value={{
        page: activeStep,
        steps,
        handleNext,
        handleBack,
        shippingInfo,
        handleChange,
        setSenderInfo,
        setRecevierInfo,
      }}
    >
      {props.children}
    </ShippingContext.Provider>
  )
}
