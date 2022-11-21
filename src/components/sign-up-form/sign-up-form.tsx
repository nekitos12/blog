import React, {useState} from 'react';
import './sign-up-form.scss'
import UserSettingsForm from "../user-settings-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {Link, useHistory} from "react-router-dom";
import {setUser} from "../../store/slice/userSlice";
import {confirmPasswordField, emailField, passwordField, usernameField} from "../../models/userInputField";
import { IUserForm } from '../user-settings-form/user-settings-form';
import {UserFormError, UserFormErrorMessage} from "../../models/types/userRequestError";
import {useSetNewUserMutation} from "../../services/userService";
import { Buffer } from 'buffer'


export default function SignUpForm() {
    const [errorForm, setErrorForm] = useState('')
    const [createUser, {}] = useSetNewUserMutation()
    const dispatch = useAppDispatch()
    const {push} = useHistory()
    const inputField = [
        usernameField,
        emailField,
        passwordField,
        confirmPasswordField
    ];

    async function onSubmit(data: IUserForm) {
        try {
            const {email, password, username} = data

                const bufPass = Buffer.from(password, 'utf-8').toString()
                const user = {username, email, password: bufPass }
                const a = await createUser(user)
                localStorage.setItem('user', JSON.stringify(a['data'].user))
            dispatch(setUser({token: a['data'].user.token}))
                push('/')

        } catch (e) {

            if (e instanceof Error) {
                console.log(e)
                const a = e.message.slice(e.message.indexOf('auth') + 5, -2)
                console.log(a)
                switch (a) {
                    case UserFormError.emailInUse:
                        setErrorForm(UserFormErrorMessage.emailInUse)
                        break
                    default:
                        setErrorForm('Произошла ошибка')
                }
            }
        }
    }

  return (
      <div className="sign-up-form">
          <UserSettingsForm error={{errorText: errorForm, link: {address: '/sign-in', text: 'страницу входа'}}} divider onSuccessSubmit={onSubmit} submitText="Create" header="Create new account" inputField={inputField} checkboxText="I agree to the processing of my personal information" footer={["Already have an account?", "Sign In" ]}/>
      </div>


  );
}
