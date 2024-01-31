import axios from "../src/Utils/AxiosGet";
import {loadPerson} from "../reducer/personReducer";

export const personAction = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const external_ids = await axios.get(`/person/${id}/external_ids`);
    const combined_credits = await axios.get(`/person/${id}/combined_credits`);
    const movie_credits = await axios.get(`/person/${id}/movie_credits`);
    const tv_credits = await axios.get(`/person/${id}/tv_credits`);

    let theUltimateData = {
      detail: detail.data,
      external_ids: external_ids.data,
      combined_credits: combined_credits.data,
      movie_credits: movie_credits.data.cast,
      tv_credits: tv_credits.data.cast,
    };
 
    dispatch(loadPerson(theUltimateData));
  } catch (error) {
    console.log(error);
  }
};

export default personAction;
