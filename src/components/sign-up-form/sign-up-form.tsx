import React, {useEffect} from 'react';
import './sign-up-form.scss'
import UserSettingsForm from "../user-settings-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {resetForm} from "../../store/slice/formSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useAppSelector} from "../../hooks/useTypedSelector";
import {setUser} from "../../store/slice/userSlice";
import {useHistory} from "react-router-dom";


export default function SignUpForm() {
    const {email, password, username} = useAppSelector(state => state.form)
    const dispatch = useAppDispatch()
    const {push} = useHistory()
    useEffect(()=>{
        dispatch(resetForm())
    }, [])
    const inputField = [
        {
            label: "Username",
            name: "username",
            type: "text"
        },
        {
            label: "Email",
            name: "email",
            type: "email"
        },
        {
            label: "Password",
            name: "password",
            type: "password"
        },
        {
            label: "Repeat Password",
            name: "repeatPassword",
            type: "password"
        }
    ];

    async function handleRegister(){
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
        if (auth.currentUser) {
            // @ts-ignore
            const {uid, accessToken} = auth.currentUser
            dispatch(setUser({accessToken, password, email, uid, username}))
            push('/')
        }

    }
  return (
      <div className="sign-up-form">
          <UserSettingsForm divider handleClick={handleRegister} submitText="Create" header="Create new account" inputField={inputField} checkboxText="I agree to the processing of my personal information" footer={["Already have an account?", "Sign In" ]}/>
      </div>


  );
}
