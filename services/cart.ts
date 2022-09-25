import {
  useQuery,
  useMutation,
  QueryClient,
  MutationFunction,
} from 'react-query'

import apiClient from '@Utils/http-common';

export const GET_CART_CACHE_KEY = 'getCart'

type UpdateProductVariables = {
  itemId: string;
  itemQuantity: string;
  itemSize: string;
}

type RemoveCartProductVariables = {
  productId: string;
}

export const useGetCartlistProducts = () => useQuery<[typeof GET_CART_CACHE_KEY]>(
  [GET_CART_CACHE_KEY],
  async () => {
    const { data } = await apiClient.get('/cart')
    return data?.products
  },
)

const updateCart: MutationFunction<null, UpdateProductVariables[]> = async (updateItem) => apiClient.patch('/cart/update', { updateItem })

export const useUpdateCartMutation = (queryClient: QueryClient) =>
  useMutation(updateCart, {
    onSuccess: () => queryClient.invalidateQueries(GET_CART_CACHE_KEY),
    onError: (error: any) => console.log(error),
  })

const removeCart: MutationFunction<null, RemoveCartProductVariables> = async ({
  productId,
}) => apiClient.patch(`/cart/remove/${productId}`)

export const useRemoveCartMutation = (queryClient: QueryClient) =>
  useMutation(removeCart, {
    onSuccess: () => queryClient.invalidateQueries(GET_CART_CACHE_KEY),
    onError: (error: any) => console.log(error),
  })
