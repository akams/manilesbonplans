import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      console.log('===authSlice==========action=======================')
      console.log('action', action)
      console.log('====================================')
      state.user = action.payload
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
