/* eslint-disable @typescript-eslint/no-explicit-any */
export type Props = {
  name?: string
  submitHandler: any;
}

export type ShippingContextType = {
  page: number;
  steps: number;
  handleNext: React.Dispatch<any>;
  handleBack: React.Dispatch<any>;
  shippingInfo: any;
  handleChange: React.Dispatch<any>;
  setSenderInfo: React.Dispatch<any>;
  setRecevierInfo: React.Dispatch<any>;
}