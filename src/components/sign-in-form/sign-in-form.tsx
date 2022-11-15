import React, {useEffect} from 'react';
import './sign-in-form.scss';
import UserSettingsForm from "../user-settings-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {resetForm} from "../../store/slice/formSlice";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from "../../store/slice/userSlice";
import {useAppSelector} from "../../hooks/useTypedSelector";
import {useHistory} from "react-router-dom";

export default function SignInForm() {
  const {email, password, username} = useAppSelector(state => state.form)
  const dispatch = useAppDispatch()
  const {push} = useHistory()
  useEffect(()=>{
    dispatch(resetForm())
  }, [])
  const inputField = [
    {
      label: "Email address",
      name: "email",
      type: "email"
    },
    {
      label: "Password",
      name: "password",
      type: "password"
    },
  ];
  async function handleRegister(){
    const auth = getAuth()
    console.log(auth)
    await signInWithEmailAndPassword(auth, email, password)
    if (auth.currentUser) {
      // @ts-ignore
      const {uid, accessToken} = auth.currentUser
      dispatch(setUser({accessToken, password, email, uid, username}))
      push('/')
    }
  }
  return (
      <UserSettingsForm handleClick={handleRegister} submitText="Login" header="sign in" inputField={inputField} footer={["Don’t have an account?", "Sign Up"]} />
  );
}
