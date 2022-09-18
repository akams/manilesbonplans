/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import * as ApiTypes from '@Types/api'
// import * as Types from '@Types'

export const requestSignUp = (payload: ApiTypes.ApiSignupType) => axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API}/signup`, payload);

// Order
export const requestPostFinishOrder = (payload: any) => axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API}/orders/terminate`, payload);