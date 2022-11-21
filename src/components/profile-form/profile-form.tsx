import React, {useState} from 'react';
import './profile-form.scss'
import UserSettingsForm from "../user-settings-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useHistory} from "react-router-dom";
import {avatarField,  emailField, newPasswordField, usernameField} from "../../models/userInputField";
import { IUserForm } from '../user-settings-form/user-settings-form';
import {useUpdateUserMutation} from "../../services/userService";
import {useAuth} from "../../hooks/useAuth";
import {updateUser} from "../../store/slice/userSlice";


export default function ProfileForm() {
    const [errorForm, setErrorForm] = useState('')
    const {token} = useAuth()
    const dispatch = useAppDispatch()
    const [updateUserMut, {}] = useUpdateUserMutation()
    const {push} = useHistory()
    const inputField = [
        usernameField,
        emailField,
        newPasswordField,
        avatarField
    ];


    async function onSubmit(data: IUserForm) {
        try{
            const {email, username, newPassword, avatarURL} = data
            const user = {email, username, password: newPassword, image: avatarURL}
            localStorage.setItem('user', JSON.stringify({...user, token}))
            const a = await updateUserMut({body:user, token})
            dispatch(updateUser(a['data'].user))

            console.log(a)
            alert('Данные обновлены!')
        }
        catch (e) {
            console.log(e)
        }

    }
  return (
      <div className="profile-form">
          <UserSettingsForm error={{errorText: errorForm}} onSuccessSubmit={onSubmit} submitText="Save" header="Edit Profile" inputField={inputField}/>
      </div>
  );
}
