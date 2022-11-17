import React from 'react';
import './sign-up-form.scss'
import UserSettingsForm from "../user-settings-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useHistory} from "react-router-dom";
import {setUser} from "../../store/slice/userSlice";
import {confirmPasswordField, emailField, passwordField, usernameField} from "../../models/inputField";
import { IUserForm } from '../user-settings-form/user-settings-form';


export default function SignUpForm() {
    const dispatch = useAppDispatch()
    const {push} = useHistory()
    const inputField = [
        usernameField,
        emailField,
        passwordField,
        confirmPasswordField
    ];

    async function onSubmit(data: IUserForm) {
        const { email, password, username, avatarURL} = data
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
        if (auth.currentUser) {
            // @ts-ignore
            const {uid, accessToken} = auth.currentUser
            const user = {accessToken, email, uid, username, avatarURL}
            localStorage.setItem('user', JSON.stringify(user))
            dispatch(setUser(user))
            push('/')
        }

    }
  return (
      <div className="sign-up-form">
          <UserSettingsForm divider onSuccessSubmit={onSubmit} submitText="Create" header="Create new account" inputField={inputField} checkboxText="I agree to the processing of my personal information" footer={["Already have an account?", "Sign In" ]}/>
      </div>


  );
}
