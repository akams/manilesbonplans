/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
} from 'react-query'

import apiClient from '@Utils/http-common';

export const GET_ORDERS_CACHE_KEY = 'getOrder'


type optionsType = {
  enabled: boolean;
  cacheTime: number;
  retry: boolean;
}

export const useGetOrder = (options: optionsType) => useQuery<[typeof GET_ORDERS_CACHE_KEY, optionsType]>(
  [GET_ORDERS_CACHE_KEY, options],
  async() => {
    const { data } = await apiClient.get("/orders")
    return data?.data
  },
  options,
)