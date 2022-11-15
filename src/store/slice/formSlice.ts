import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface IUserForm {
    username?: null | string
    email: null | string
    password: null | string
    repeatPassword?: null | string
    avatarURL?: null | string
    newPassword?: null | string
}

interface IAction {
    name: string
    value: string
}

const formSlice = createSlice({
    name: 'form',
    initialState: {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        avatarURL: '',
        newPassword: '',
    },
    reducers: {
        changeInput(state: IUserForm, action: PayloadAction<IAction>) {
            state[action.payload.name] = action.payload.value
        },
        resetForm(state: IUserForm) {
            state.username = ''
            state.email = ''
            state.password = ''
            state.repeatPassword = ''
            state.avatarURL = ''
            state.newPassword = ''
        }
    },
});

export const {changeInput, resetForm} = formSlice.actions
export default formSlice.reducer;