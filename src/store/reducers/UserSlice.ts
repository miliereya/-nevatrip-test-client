import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../models/IUser"

interface UserState {
    isAuth: boolean
    user: IUser
}

const initialState: UserState = {
    isAuth: false,
    user: {
        id: '',
        email: '',
        tickets: [],
        role: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        setCart(state, action: PayloadAction<string[]>) {
            state.user.tickets = action.payload 
        },
        logout(){
            return initialState
        }
    },

})

export default userSlice.reducer