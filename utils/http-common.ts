import axios from "axios";

export default axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ENDPOINT_API}`,
  headers: {
    "Content-type": "application/json"
  }
});

export const setHeaders = (jwtToken: string|undefined) => ({
  Authorization: `Bearer ${jwtToken}`,
  Accept: 'application/json',
});