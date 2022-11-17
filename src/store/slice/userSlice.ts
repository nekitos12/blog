import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser{
    accessToken?: string
    uid?: string
    isAuth: boolean
    username: string
    email: string
    avatarURL?: string
    password: string
}

interface IAction {
    username: string
    email: string
    accessToken?: string
    uid?: string
    avatarURL?: string
    password: string
}

const userSlice = createSlice({
    name: 'user',
    initialState: {} as IUser,
    reducers:{
        setUser(state: IUser, action: PayloadAction<IAction>){
            state.isAuth = true
            state.username = action.payload.username
            state.uid = action.payload.uid
            state.accessToken = action.payload.accessToken
            state.email= action.payload.email
            state.password = action.payload.password
        },
        updateUser (state: IUser, action: PayloadAction<IAction>){
            for (let key in action.payload){
                state[key] = action.payload[key]
            }
        },
        resetUser(state: IUser){
            state.isAuth = false
            state.username = ''
            state.uid = ''
            state.accessToken = ''
            state.email= ''
            state.password = ''
        }
    },
});

export const {setUser, resetUser, updateUser} = userSlice.actions
export default userSlice.reducer;