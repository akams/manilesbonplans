import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    brands: [],
    categories: [],
    sort: 'default',
  },
  reducers: {
    selectBrand(state, action) {
      console.log('======selectBrand========action.payload======================')
      console.log(action.payload)
      console.log('====================================')
      //@ts-ignore
      state.brands.push(action.payload)
    },
    deselectBrand(state, action) {
      state.brands = state.brands.filter((value) => value !== action.payload)
    },
    selectCategory(state, action) {
      console.log('======selectCategory========action.payload======================')
      console.log(action.payload)
      console.log('====================================')
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
