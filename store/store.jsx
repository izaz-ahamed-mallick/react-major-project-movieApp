import {configureStore} from '@reduxjs/toolkit'
 import  movieReducer  from '../reducer/movieReducer'
 import tvReducer from '../reducer/tvReducer'
 import personReducer from '../reducer/personReducer'

export const store = configureStore({
  reducer:{
    movie:movieReducer,
    tv:tvReducer,
    person:personReducer
  }
})
export default store;
