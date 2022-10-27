import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TLanguage } from "../../models/TLanguage"

interface LanguageState {
    language: TLanguage
}

const initialState: LanguageState = {
    language: 'ru'
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<TLanguage>) {
            state.language = action.payload
        }
    },
    
})

export default languageSlice.reducer