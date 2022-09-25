import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './filterSlice'
import authReducer from './authSlice'
import wishlistReducer from './wishlistSlice'
import cartReducer from './cartSlice'
import genderReducer from './genderSlice'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    gender: genderReducer,
  },
})

export {
  filterReducer,
  authReducer,
  wishlistReducer,
  cartReducer,
  genderReducer,
}

export default store
