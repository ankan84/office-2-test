import {createSlice} from '@reduxjs/toolkit'

const initialState={
    value:0,
    cart:[]
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment: (state) => {
        
        state.value += 1
      },
      decrement: (state) => {
        if(!state.value<0){
            state.value -= 1
        }
       
      },
      addProduct: (state,payload) => {

        state.cart.push(payload)
        state.value=state.cart.length
      },
      removeProduct:(state,payload)=>{
        
        state.cart=state.cart.filter((ele,index)=>{
            return payload=index
        })
        state.value=state.cart.length
      }

    },
  })
  
  // Action creators are generated for each case reducer function
  export const { increment, decrement, addProduct,removeProduct } = counterSlice.actions
  
  export default counterSlice.reducer