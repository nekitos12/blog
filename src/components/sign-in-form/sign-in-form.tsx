import React, { useState } from 'react'
import './sign-in-form.scss'
import { useHistory } from 'react-router-dom'

import UserSettingsForm from '../user-settings-form'
import { emailField, passwordField } from '../../models/userInputField'
import { IUserForm } from '../user-settings-form/user-settings-form'
import { UserFormErrorMessage, UserFormError } from '../../models/types/userRequestError'
import { useLoginUserMutation } from '../../services/userService'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setUser } from '../../store/slice/userSlice'

export default function SignInForm() {
  const [errorForm, setErrorForm] = useState('')
  const dispatch = useAppDispatch()
  const [loginUser] = useLoginUserMutation()
  const { push } = useHistory()
  const inputField = [emailField, passwordField]

  async function onSubmit(data: IUserForm) {
    try {
      const { email, password, username } = data
      const user = { email, username, password }
      const response = await loginUser(user)
      // @ts-ignore
      if (response.error && response.error.status / 4 > 100) {
        // @ts-ignore
        const { error } = response
        throw new Error(String(Object.values(error.data.errors)[0]))
      }
      localStorage.setItem('user', JSON.stringify(response['data'].user))
      dispatch(setUser({ token: response['data'].user.token }))
      push('/')
    } catch (e) {
      if (e instanceof Error) {
        switch (e.message) {
          case UserFormError.isInvalid:
            setErrorForm(UserFormErrorMessage.isInvalid)
            break
          default:
            setErrorForm('Произошла ошибка')
        }
      }
    }
  }

  return (
    <div className='sign-in-form'>
      <UserSettingsForm
        error={{ errorText: errorForm }}
        onSuccessSubmit={onSubmit}
        submitText='Login'
        header='sign in'
        inputField={inputField}
        footer={['Don’t have an account?', 'Sign Up']}
      />
    </div>
  )
}
