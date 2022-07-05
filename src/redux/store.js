import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import sampleReducer from "./reducers/sampleReducer";

const rootReducer = combineReducers({
    sample: sampleReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;
