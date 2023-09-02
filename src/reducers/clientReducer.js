import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
    name: 'client',
    initialState: null,
    reducers: {
        setClientData(state,actions){
            return actions.payload
        }
    }
})

export const { setClientData } = clientSlice.actions
export default clientSlice.reducer