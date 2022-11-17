import React, {useState} from 'react';
import './profile-form.scss'
import UserSettingsForm from "../user-settings-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import { getAuth, updateEmail,   updatePassword, updateProfile } from "firebase/auth";
import {useHistory} from "react-router-dom";
import { updateUser} from "../../store/slice/userSlice";
import {avatarField,  emailField, newPasswordField, usernameField} from "../../models/inputField";
import { IUserForm } from '../user-settings-form/user-settings-form';
import firebase from "firebase/compat";
import {useAppSelector} from "../../hooks/useTypedSelector";
import {UserFormError, UserFormErrorMessage} from "../../models/types/userRequestError";


export default function ProfileForm() {
    const [errorForm, setErrorForm] = useState('')
    const {password} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const {push} = useHistory()
    const inputField = [
        usernameField,
        emailField,
        newPasswordField,
        avatarField
    ];


    async function onSubmit(data: IUserForm) {
        const {email, username, newPassword, avatarURL} = data
        const {currentUser} = getAuth()
        console.log(currentUser)
        if (currentUser) {
            // @ts-ignore
            const {uid, accessToken} = currentUser
            const user = {email, username, avatarURL, uid, accessToken, password}
            await updateProfile(currentUser, {
                displayName: username, photoURL: avatarURL
            })
            await updateEmail(currentUser, email)
            if (newPassword === password) {
                user.password = newPassword
                setErrorForm('Пароли совпадают')
                return
            }
            await updatePassword(currentUser, newPassword)
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch(updateUser(user))
            alert('Данные обновлены!')
        }
    }
  return (
      <div className="sign-up-form">
          <UserSettingsForm error={{errorText: errorForm}} onSuccessSubmit={onSubmit} submitText="Save" header="Edit Profile" inputField={inputField}/>
      </div>
  );
}
