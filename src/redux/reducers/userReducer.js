import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
})

export const {setUser} = user.actions

export default user.reducer
