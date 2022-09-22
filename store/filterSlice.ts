import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    brands: ['ALL'],
    categories: [],
    sort: 'default',
  },
  reducers: {
    selectBrand(state, action) {
      const brands = state.brands.filter((brand) => brand !== 'ALL')
      //@ts-ignore
      brands.push(action.payload)
      //@ts-ignore
      state.brands = brands
    },
    deselectBrand(state, action) {
      const brands = state.brands.filter((value) => value !== action.payload)
      //@ts-ignore
      state.brands = brands.length === 0 ? ['ALL'] : brands
    },
    selectCategory(state, action) {
      //@ts-ignore
      state.categories.push(action.payload)
    },
    deselectCategory(state, action) {
      state.categories = state.categories.filter(
        (value) => value !== action.payload,
      )
    },
    chooseSort(state, action) {
      state.sort = action.payload
    },
  },
})

export const filterActions = filterSlice.actions

export default filterSlice.reducer
