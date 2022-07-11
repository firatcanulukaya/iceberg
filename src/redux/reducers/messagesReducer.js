import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    messages: [],
    loading: true
}

export const messages = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
            state.loading = false
        },
    },
})

export const {setMessages} = messages.actions

export default messages.reducer
