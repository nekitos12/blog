import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ILogUser{
    isAuth?: boolean
    token: string
    username?: string
    email?:string
    bio?: string
    image?: string
}


const logUserSlice = createSlice({
    name: 'user',
    initialState: {} as ILogUser,
    reducers:{
        setUser(state: ILogUser, action: PayloadAction<ILogUser>){
            console.log(action.payload.token)
            state.isAuth = true
            state.token = action.payload.token
        },
        resetUser(state: ILogUser, action: PayloadAction<ILogUser>){
            console.log(action)
            state.isAuth = false
            state.token = action.payload.token
        },
        updateUser(state: ILogUser, action: PayloadAction<ILogUser>){
            console.log(action)
            for (const key in action.payload){
                state[key] = key
            }
        }
    },
});

export const {setUser, resetUser, updateUser} = logUserSlice.actions
export default logUserSlice.reducer;