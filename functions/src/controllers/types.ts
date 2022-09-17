type BodySignupType = {
  uid: string,
  name: string,
  email: string,
}

export type RequestSignup = {
  body: BodySignupType,
}
