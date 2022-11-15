import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserForm} from "./formSlice";

interface IUser extends IUserForm{
    accessToken: null | string
    uid: null | string
}

interface IAction {
    username: string
    email: string
    password: string
    accessToken: string
    uid: string
}

const userSlice = createSlice({
    name: 'user',
    initialState: {} as IUser,
    reducers:{
        setUser(state: IUser, action: PayloadAction<IAction>){
            state.username = action.payload.username
            state.uid = action.payload.uid
            state.accessToken = action.payload.accessToken
            state.email= action.payload.email
            state.password = action.payload.password
        },
        resetUser(state: IUser){
            state.username = null
            state.uid = null
            state.accessToken = null
            state.email= null
            state.password = null
        }
    },
});

export const {setUser, resetUser} = userSlice.actions
export default userSlice.reducer;