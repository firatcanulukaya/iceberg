import {SAMPLE_TYPE} from "../types";

export const sampleAction = (data) => dispatch => {
    dispatch({type: SAMPLE_TYPE, payload: data})
}
