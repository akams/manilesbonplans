/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
} from 'react-query'

import apiClient from '@Utils/http-common';

export const GET_PRODUCT_CACHE_KEY = 'getProduct'


type optionsType = {
  enabled: boolean;
  cacheTime: number;
  retry: boolean;
}

export const useGetOrder = (options: optionsType) => useQuery<[typeof GET_PRODUCT_CACHE_KEY, optionsType]>(
  [GET_PRODUCT_CACHE_KEY, options],
  async() => {
    const { data } = await apiClient.get("/products")
    return data?.data
  },
  options,
)