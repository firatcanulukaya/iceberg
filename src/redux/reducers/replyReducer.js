import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isReplying: false,
    reply: null,
}

export const reply = createSlice({
    name: 'reply',
    initialState,
    reducers: {
        startReplying: (state, action) => {
            state.isReplying = true
            state.reply = action.payload
        },
        stopReplying: (state) => {
            state.isReplying = false
            state.reply = null
        }
    },
})

export const {startReplying, stopReplying} = reply.actions

export default reply.reducer
