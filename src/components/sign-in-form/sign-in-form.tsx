import React, { useState} from 'react';
import './sign-in-form.scss';
import UserSettingsForm from "../user-settings-form";
import {useHistory} from "react-router-dom";
import {emailField, passwordField} from "../../models/userInputField";
import {IUserForm} from "../user-settings-form/user-settings-form";
import {UserFormErrorMessage, UserFormError} from "../../models/types/userRequestError";
import {useLoginUserMutation} from "../../services/userService";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setUser} from "../../store/slice/userSlice";

export default function SignInForm() {
  const [errorForm, setErrorForm] = useState('')
  const dispatch = useAppDispatch()
  const [loginUser, {}] = useLoginUserMutation()
  const {push} = useHistory()
  const inputField = [
    emailField,
    passwordField
  ];
  async function onSubmit(data: IUserForm){
    try {
      const { email, password, username } = data
        const user = { email, username, password}

        const a = await loginUser(user)

        localStorage.setItem('user', JSON.stringify(a['data'].user))
      dispatch(setUser({token: a['data'].user.token}))
        push('/')
      }
     catch (e) {
      if (e instanceof Error) {
        const a = e.message.slice(e.message.indexOf('auth')+5, -2)
        switch (a) {
          case UserFormError.userNotFound:
            setErrorForm(UserFormErrorMessage.userNotFound)
            break
          case UserFormError.wrongPassword:
            setErrorForm(UserFormErrorMessage.wrongPassword)
            break
          default:
            setErrorForm('Произошла ошибка')
        }
      }
    }

  }
  return (
      <div className="sign-in-form">
        <UserSettingsForm error={{errorText: errorForm}} onSuccessSubmit={onSubmit} submitText="Login" header="sign in" inputField={inputField} footer={["Don’t have an account?", "Sign Up"]} />
      </div>
        );
}
