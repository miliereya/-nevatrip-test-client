import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IsLoadingState {
    isLoading: boolean
    isCheckAuthLoading: boolean 
    isCartLoading: boolean
    //Для безопасного рендеринга, где наличие авторизации влияет на структуру компоненты 
}

const initialState: IsLoadingState = {
    isLoading: false,
    isCheckAuthLoading: false,
    isCartLoading: false
}

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setCheckAuthLoading(state, action: PayloadAction<boolean>) {
            state.isCheckAuthLoading = action.payload
        },
        setCartLoading(state, action: PayloadAction<boolean>) {
            state.isCartLoading = action.payload
        },
    },
    
})

export default isLoadingSlice.reducer