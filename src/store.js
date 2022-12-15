import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './reducers'

export const store = configureStore({
    reducer: {counterSlice}
  })

  