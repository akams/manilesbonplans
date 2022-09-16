
export type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitHandlerForm: any;
}

export type ShippingContextType = {
  page: number;
  steps: number;
  handleNext: React.Dispatch<React.SetStateAction<number>>;
  handleBack: React.Dispatch<React.SetStateAction<number>>;
}