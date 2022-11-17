import React, {useEffect} from 'react';
import './sign-in-form.scss';
import UserSettingsForm from "../user-settings-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useHistory} from "react-router-dom";
import {setUser} from "../../store/slice/userSlice";
import {emailField, passwordField} from "../../models/inputField";
import {IUserForm} from "../user-settings-form/user-settings-form";

export default function SignInForm() {
  const dispatch = useAppDispatch()
  const {push} = useHistory()
  const inputField = [
    emailField,
    passwordField
  ];
  async function onSubmit(data: IUserForm){
    const { email, password, username, avatarURL} = data
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email, password)
    if (auth.currentUser) {
      // @ts-ignore
      const {uid, accessToken} = auth.currentUser
      const user = {accessToken, email, uid, username, avatarURL}
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      console.log('я тут')
      push('/')
    }
  }
  return (
      <UserSettingsForm onSuccessSubmit={onSubmit} submitText="Login" header="sign in" inputField={inputField} footer={["Don’t have an account?", "Sign Up"]} />
  );
}
