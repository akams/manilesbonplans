/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
} from 'react-query'

import apiClient from '@Utils/http-common';

export const GET_LIST_SHOES_CACHE_KEY = 'getListShoes'
export const GET_SHOES_CATEGORIES_CACHE_KEY = 'getShoesCategories'
export const GET_SHOES_BRANDS_CACHE_KEY = 'getShoesBrand'


type optionsType = {
  enabled: boolean;
  cacheTime: number;
  retry: boolean;
}

type ProductShoes = {
  filteredBrands: string;
  category: string;
  last: string;
}

// export const useGetProduct = ({ id }: any, options: optionsType) => useQuery<[typeof GET_PRODUCT_CACHE_KEY, any, optionsType]>(
//   [GET_PRODUCT_CACHE_KEY, { id }, options],
//   async () => {
//     const { data } = await apiClient.get(`/product/${id}`)
//     return data?.product
//   },
//   options,
// )
export const useGetShoes = ({ filteredBrands, last, category }: ProductShoes, options: optionsType) => useQuery<[typeof GET_LIST_SHOES_CACHE_KEY, ProductShoes, optionsType]>(
  [GET_LIST_SHOES_CACHE_KEY, { filteredBrands, last, category }, options],
  async () => {
    const { data } = await apiClient.get('/products/shoes', { params: { brands: filteredBrands || '', last: last || '', category } })
    return data
  },
  options,
)

export const useGetShoesCategories = (options: optionsType) => useQuery<[typeof GET_SHOES_CATEGORIES_CACHE_KEY, optionsType]>(
  [GET_SHOES_CATEGORIES_CACHE_KEY, options],
  async () => {
    const { data } = await apiClient.get("/products/shoes/categories")
    return data?.categories
  },
  options,
)

export const useGetShoesBrands = (options: optionsType) => useQuery<[typeof GET_SHOES_BRANDS_CACHE_KEY, optionsType]>(
  [GET_SHOES_BRANDS_CACHE_KEY, options],
  async () => {
    const { data } = await apiClient.get("/products/shoes/brands")
    return data?.brands
  },
  options,
)
