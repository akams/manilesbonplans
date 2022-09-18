/* eslint-disable @typescript-eslint/no-explicit-any */
type BodySignupType = {
  uid: string,
  name: string,
  email: string,
}

export type RequestSignup = {
  body: BodySignupType,
}


type BodyCreateOrderType = {
  deliveryAddressName: string;
  deliveryAddressStreet: string;
  deliveryAddressCity: string;
  deliveryAddressCountry: string;
  deliveryAddressZipCode: string;
  deliveryAddressTel: string;
}

export type RequestCreateOrder = {
  body: BodyCreateOrderType,
  user?: any
}
