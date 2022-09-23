import {
  useQuery,
  useMutation,
  QueryClient,
  MutationFunction,
} from 'react-query'

import apiClient from '@Utils/http-common';

export const GET_WISHLIST_CACHE_KEY = 'getWishlist'

export const useGetWishlistProducts = () => useQuery<[typeof GET_WISHLIST_CACHE_KEY]>(
  [GET_WISHLIST_CACHE_KEY],
  async () => {
    const { data } = await apiClient.get('/wishlist')
    return data?.products
  },
)

type UpdateProductVariables = {
  productId: string;
}

const updateWishlist: MutationFunction<null, UpdateProductVariables> = async ({
  productId,
}) => apiClient.patch(`/wishlist/remove/${productId}`)

export const useUpdateWishlistMutation = (queryClient: QueryClient) =>
  useMutation(updateWishlist, {
    onSuccess: () => queryClient.invalidateQueries(GET_WISHLIST_CACHE_KEY),
    onError: (error: any) => console.log(error),
  })
