/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
  QueryClient,
  useMutation,
} from 'react-query'

import apiClient from '@Utils/http-common';

export const GET_PRODUCT_CACHE_KEY = 'getProduct'
export const GET_PRODUCT_BRANDS_CACHE_KEY = 'getProductBrand'


type optionsType = {
  enabled: boolean;
  cacheTime: number;
  retry: boolean;
}

const getProducts: any = async({
  filteredBrands,
  lastVisibleItem,
}: any) => {
    const { data } = await apiClient.get(`/products?categories=${filteredBrands.join("&")}&last=${lastVisibleItem || ''}`)
    return { 
      products: data?.products,
      last: data?.last
    }
}

export const useGetProductsMutation = (queryClient: QueryClient) => useMutation(getProducts, {
  onSuccess: () => queryClient.invalidateQueries(GET_PRODUCT_CACHE_KEY),
  onError: (error: any) => console.log(error),
})

export const useGetProducts = ({ filteredBrands, last }: any, options: optionsType) => useQuery<[typeof GET_PRODUCT_CACHE_KEY, optionsType]>(
  [GET_PRODUCT_CACHE_KEY, options],
  async() => {
    const { data } = await apiClient.get(`/products?categories=${filteredBrands.join("&")}&last=${last || ''}`)
    return data
  },
  options,
)

export const useGetBrands = (options: optionsType) => useQuery<[typeof GET_PRODUCT_BRANDS_CACHE_KEY, optionsType]>(
  [GET_PRODUCT_BRANDS_CACHE_KEY, options],
  async() => {
    const { data } = await apiClient.get("/products/brands")
    return data?.brands
  },
  options,
)
