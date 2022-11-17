import React, { useState} from 'react';
import './sign-in-form.scss';
import UserSettingsForm from "../user-settings-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useHistory} from "react-router-dom";
import {setUser} from "../../store/slice/userSlice";
import {emailField, passwordField} from "../../models/inputField";
import {IUserForm} from "../user-settings-form/user-settings-form";
import {UserFormErrorMessage, UserFormError} from "../../models/types/userRequestError";

export default function SignInForm() {
  const [errorForm, setErrorForm] = useState('')
  const dispatch = useAppDispatch()
  const {push} = useHistory()
  const inputField = [
    emailField,
    passwordField
  ];
  async function onSubmit(data: IUserForm){
    try {
      const { email, password } = data
      const auth = getAuth()
      console.log(auth)
      await signInWithEmailAndPassword(auth, email, password)
      if (auth.currentUser) {
        // @ts-ignore
        const {uid, accessToken, displayName} = auth.currentUser
        const user = {accessToken, email, uid, username: displayName, password}
        localStorage.setItem('user', JSON.stringify(user))
        // @ts-ignore
        dispatch(setUser(user))
        console.log('я тут')
        push('/')
      }
    } catch (e) {
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
      <UserSettingsForm error={{errorText: errorForm}} onSuccessSubmit={onSubmit} submitText="Login" header="sign in" inputField={inputField} footer={["Don’t have an account?", "Sign Up"]} />
  );
}
