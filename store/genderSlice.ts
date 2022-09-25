import { createSlice } from '@reduxjs/toolkit'

const genderSlice = createSlice({
  name: 'gender',
  initialState: {
    value: '',
  },
  reducers: {
    setGender(state, action) {
      state.value = action.payload
    },
  },
})

export const genderActions = genderSlice.actions

export default genderSlice.reducer
