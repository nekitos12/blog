import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserForm} from "../../components/user-settings-form/user-settings-form";

export interface IUser extends IUserForm{
    accessToken?: string
    uid?: string
    isAuth: boolean
}

interface IAction {
    username: string | undefined
    email: string
    accessToken: string | undefined
    uid: string | undefined
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
        },
        resetUser(state: IUser){
            state.isAuth = false
            state.username = ''
            state.uid = ''
            state.accessToken = ''
            state.email= ''
        }
    },
});

export const {setUser, resetUser} = userSlice.actions
export default userSlice.reducer;