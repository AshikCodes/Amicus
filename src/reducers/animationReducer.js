import { createSlice } from "@reduxjs/toolkit";

const animationSlice = createSlice({
    name: 'animation',
    initialState: 0,
    reducers: {
        setAnimationCount(state,actions){
            return actions.payload
        }
    }
})

export const { setAnimationCount } = animationSlice.actions
export default animationSlice.reducer