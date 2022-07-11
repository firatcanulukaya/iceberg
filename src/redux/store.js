import {configureStore} from '@reduxjs/toolkit'
import reply from "./reducers/replyReducer";

export const store = configureStore({
    reducer: {
        reply
    },
})
