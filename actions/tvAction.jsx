
import axios from '../src/Utils/AxiosGet'
import {loadTv} from '../reducer/tvReducer'

export const tvAction = (id)=>async(dispatch)=> {
   try {
    const detail = await axios.get(`/tv/${id}`)
    const external_ids = await axios.get(`/tv/${id}/external_ids`)
    const recommendations = await axios.get(`/tv/${id}/recommendations`)
    const similar = await axios.get(`/tv/${id}/similar`)
    const videos = await axios.get(`/tv/${id}/videos`)
    const translations = await axios.get(`/tv/${id}/translations`)
    const watchProvider = await axios.get(`/tv/${id}/watch/providers`)

   let theUltimateData = {
    detail:detail.data,
    external_ids:external_ids.data,
    recommendations:recommendations.data.results,
    similar:similar.data.results,
    translations:translations.data.translations,
    videos:videos.data.results.find((m)=>m.type==='Trailer'),
    watchProvider:watchProvider.data.results.IN
}
   
     dispatch(loadTv(theUltimateData))
   } catch (error) {
    console.log(error);
   }
}

export default tvAction;