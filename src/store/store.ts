import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { articleAPI } from '../services/articleService'
import userReducer from './slice/userSlice'
const rootReducer = combineReducers({
    [articleAPI.reducerPath]: articleAPI.reducer,
    user: userReducer,
})



export const setUpStore = ()=> {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(articleAPI.middleware))
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setUpStore>
export type AppDispatch = AppStore['dispatch']

