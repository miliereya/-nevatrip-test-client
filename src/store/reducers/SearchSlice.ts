import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { VoyageResponse } from "../../models/response/VoyageResponse"

interface SearchState {
    cityFrom: string
    cityTo: string
    date: string
    quantity: string
    result: VoyageResponse
}

const initialState: SearchState = {
    cityFrom: '',
    cityTo: '',
    date: '',
    quantity: '',
    result: {
        voyagesData: [],
        date: '',
        quantity: ''
    }
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setCityFrom(state, action: PayloadAction<string>) {
            state.cityFrom = action.payload
        },
        setCityTo(state, action: PayloadAction<string>) {
            state.cityTo = action.payload
        },
        setDate(state, action: PayloadAction<string>) {
            state.date = action.payload
        },
        setQuantity(state, action: PayloadAction<string>) {
            state.quantity = action.payload
        },
        setResult(state, action: PayloadAction<VoyageResponse>) {
            state.result = action.payload
        },
        resetResult(state) {
            state.result = initialState.result
        }
    },
    
})

export default searchSlice.reducer