import React, { useState, createContext } from "react";

export const ShippingContext = createContext({});

export const ShippingContextProvider = (props) => {
  const [shippingInfo, setlabelInfo] = useState({
    sender: {
      name: "a",
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    recevier: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    weight: "",
    shippingOption: "1"
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  console.log("page", activeStep);
  const handleChange = (prop) => (event) => {
    setlabelInfo({ ...shippingInfo, [prop]: event.target.value });
  };

  const setSenderInfo = (prop) => (event) => {
    setlabelInfo({
      ...shippingInfo,
      sender: { ...shippingInfo.sender, [prop]: event.target.value }
    });
  };
  const setRecevierInfo = (prop) => (event) => {
    setlabelInfo({
      ...shippingInfo,
      recevier: { ...shippingInfo.recevier, [prop]: event.target.value }
    });
  };
  const steps = ['Adresse de livraison', 'Adresse de facturation', 'Mode de paiement'];

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
        setRecevierInfo
      }}
    >
      {props.children}
    </ShippingContext.Provider>
  );
};
