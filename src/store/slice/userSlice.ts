import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ILogUser {
  isAuth?: boolean
  token: string
  username?: string
  email?: string
  bio?: string
  image?: string
}

const logUserSlice = createSlice({
  name: 'user',
  initialState: {} as ILogUser,
  reducers: {
    setUser(state: ILogUser, action: PayloadAction<ILogUser>) {
      state.isAuth = true
      state.token = action.payload.token
    },
    resetUser(state: ILogUser, action: PayloadAction<ILogUser>) {
      state.isAuth = false
      state.token = action.payload.token
    },
    updateUser(state: ILogUser, action: PayloadAction<ILogUser>) {
      for (const key in action.payload) {
        state[key] = key
      }
    },
  },
})

export const { setUser, resetUser, updateUser } = logUserSlice.actions
export default logUserSlice.reducer
