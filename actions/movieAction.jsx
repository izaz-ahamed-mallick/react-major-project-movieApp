import React from 'react'
import axios from '../src/Utils/AxiosGet'
import {loadMovie} from '../reducer/movieReducer'

export const movieAction = (id)=>async(dispatch)=> {
   try {
    const detail = await axios.get(`/movie/${id}`)
    const external_ids = await axios.get(`/movie/${id}/external_ids`)
    const recommendations = await axios.get(`/movie/${id}/recommendations`)
    const similar = await axios.get(`/movie/${id}/similar`)
    const videos = await axios.get(`/movie/${id}/videos`)
    const translations = await axios.get(`/movie/${id}/translations`)
    const watchProvider = await axios.get(`/movie/${id}/watch/providers`)

   let theUltimateData = {
    detail:detail.data,
    external_ids:external_ids.data,
    recommendations:recommendations.data.results,
    similar:similar.data.results,
    translations:translations.data.translations,
    videos:videos.data.results.find((m)=>m.type==='Trailer'),
    watchProvider:watchProvider.data.results.IN
}
   
     dispatch(loadMovie(theUltimateData))
   } catch (error) {
    console.log(error);
   }
}

export default movieAction;