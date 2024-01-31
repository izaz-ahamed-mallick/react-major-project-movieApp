import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   info:null
}

const tvSlice = createSlice({
  name:'movie',
  initialState,
  reducers:{
    loadTv:(state,action)=>{
        state.info = action.payload
    },
    removeTv:(state,action)=>{
         state.info = null
    }
  }
})

export const {loadTv,removeTv} = tvSlice.actions;
export default tvSlice.reducer