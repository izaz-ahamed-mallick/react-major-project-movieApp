import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   info:null
}

const personSlice = createSlice({
  name:'movie',
  initialState,
  reducers:{
    loadPerson:(state,action)=>{
        state.info = action.payload
    },
    removePerson:(state,action)=>{
         state.info = null
    }
  }
})

export const {loadPerson,removePerson} = personSlice.actions;
export default personSlice.reducer