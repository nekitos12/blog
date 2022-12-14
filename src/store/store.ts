import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { articleAPI } from '../services/articleService'
import { userAPI } from '../services/userService'

import userReducer from './slice/userSlice'
const rootReducer = combineReducers({
  [articleAPI.reducerPath]: articleAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  logUser: userReducer,
})

export const setUpStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(articleAPI.middleware, userAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setUpStore>
export type AppDispatch = AppStore['dispatch']
