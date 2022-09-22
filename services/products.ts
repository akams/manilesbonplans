/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
} from 'react-query'

import apiClient from '@Utils/http-common';

export const GET_PRODUCT_CACHE_KEY = 'getProduct'
export const GET_PRODUCTS_CACHE_KEY = 'getProducts'
export const GET_PRODUCT_BRANDS_CACHE_KEY = 'getProductBrand'


type optionsType = {
  enabled: boolean;
  cacheTime: number;
  retry: boolean;
}

export const useGetProducts = ({ filteredBrands, last }: any, options: optionsType) => useQuery<[typeof GET_PRODUCTS_CACHE_KEY, any, optionsType]>(
  [GET_PRODUCTS_CACHE_KEY, { filteredBrands, last }, options],
  async () => {
    const { data } = await apiClient.get('/products', { params: { categories: filteredBrands || '', last: last || '' } })
    return data
  },
  options,
)

export const useGetProduct = ({ id }: any, options: optionsType) => useQuery<[typeof GET_PRODUCT_CACHE_KEY, any, optionsType]>(
  [GET_PRODUCT_CACHE_KEY, { id }, options],
  async () => {
    const { data } = await apiClient.get(`/product/${id}`)
    return data?.product
  },
  options,
)

export const useGetBrands = (options: optionsType) => useQuery<[typeof GET_PRODUCT_BRANDS_CACHE_KEY, optionsType]>(
  [GET_PRODUCT_BRANDS_CACHE_KEY, options],
  async () => {
    const { data } = await apiClient.get("/products/brands")
    return data?.brands
  },
  options,
)
