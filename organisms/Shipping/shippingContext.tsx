import React, { createContext } from 'react'

export const ShippingContext = createContext({})

export const ShippingContextProvider = (props) => {
  // const steps = ['Adresse de livraison', 'Adresse de facturation', 'Mode de paiement']
  const steps = ['Adresse de livraison', 'Mode de paiement']
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <ShippingContext.Provider
      value={{
        steps,
        page: activeStep,
        handleNext,
        handleBack,
      }}
    >
      {props.children}
    </ShippingContext.Provider>
  )
}
