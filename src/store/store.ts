import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { cityAPI } from '../services/CityService'
import { userAPI } from '../services/UserService'
import languageSlice from './reducers/LanguageSlice'
import IsLoadingSlice from './reducers/IsLoadingSlice'
import UserSlice from './reducers/UserSlice'
import SearchSlice from './reducers/SearchSlice'

const rootReducer = combineReducers({
    languageSlice,
    IsLoadingSlice,
    SearchSlice,
    UserSlice,
    [cityAPI.reducerPath]: cityAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([cityAPI.middleware, userAPI.middleware])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']