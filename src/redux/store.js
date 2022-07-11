import {configureStore} from '@reduxjs/toolkit'
import reply from "./reducers/replyReducer";
import messages from "./reducers/messagesReducer";
import user from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        reply,
        messages,
        user
    },
})
