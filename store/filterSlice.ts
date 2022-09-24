/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    brands: ['ALL'],
    category: 'ALL',
    sort: 'default',
  },
  reducers: {
    selectBrand(state, action) {
      const brands = state.brands.filter((brand) => brand !== 'ALL')
      brands.push(action.payload)
      state.brands = brands
    },
    deselectBrand(state, action) {
      const brands = state.brands.filter((value) => value !== action.payload)
      state.brands = brands.length === 0 ? ['ALL'] : brands
    },
    selectCategory(state, action) {
      state.category = action.payload
    },
    deselectCategory(state) {
      state.category = 'ALL'
    },
    chooseSort(state, action) {
      state.sort = action.payload
    },
  },
})

export const filterActions = filterSlice.actions

export default filterSlice.reducer
