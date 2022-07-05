import {SAMPLE_TYPE} from '../types';

const initial_state = {
    data: null,
}

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case SAMPLE_TYPE:
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state
    }
}

export default reducer
