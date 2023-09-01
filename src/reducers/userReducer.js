import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUserData(state,actions){
            return actions.payload
        }
    }
})

export const { setUserData } = userSlice.actions
export default userSlice.reducer