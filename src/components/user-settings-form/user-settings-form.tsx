import React, { FormEvent } from 'react'
import './user-settings-form.scss'
import { Button, Checkbox, Divider, FormControlLabel } from '@mui/material'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm, UseFormHandleSubmit } from 'react-hook-form'

import InputForm from '../input-form'
import { IUserFormFieldType } from '../../models/types/userInputRules'

import FormError from './form-error'

interface IInputField {
  name: string
  label: string
  type: string
  rules: IUserFormFieldType
}

export interface IUserForm {
  username: string
  email: string
  password: string
  confirmPassword?: string
  avatarURL?: string
  newPassword: string
  checkbox: boolean
}

interface IUserSettingsForm {
  header: string
  submitText: string
  inputField: Array<IInputField>
  classes?: string
  checkboxText?: string
  footer?: Array<string>
  divider?: boolean
  onSuccessSubmit: SubmitHandler<IUserForm>
  currentAvatarUrl?: string
  currentEmail?: string
  currentUsername?: string
  error: {
    errorText: string
    link?: {
      text: string
      address: string
    }
  }
}

export default function UserSettingsForm({
  error,
  onSuccessSubmit,
  checkboxText,
  inputField,
  footer,
  header,
  submitText,
  divider,
  currentEmail,
  currentAvatarUrl,
  currentUsername,
}: IUserSettingsForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<IUserForm>({
    mode: 'onBlur',
  })
  const onSubmit: SubmitHandler<IUserForm> = (data, e) => {
    reset()
    e?.preventDefault()
    onSuccessSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='user-settings-form'>
      <>
        <header className='user-settings-form__header'>{header}</header>
        {inputField.map(({ name, label, type, rules }) => {
          if (name === 'confirmPassword') {
            // @ts-ignore
            rules.validate = (val: string) => {
              if (watch('password') !== val) {
                return 'Ваши пароли не совпадают'
              }
            }
          }
          let value = ''
          if (name === 'email') value += currentEmail ? currentEmail : ''
          if (name === 'username') value += currentUsername ? currentUsername : ''
          if (name === 'avatarURL') value += currentAvatarUrl ? currentAvatarUrl : ''
          return (
            <div key={name}>
              <InputForm
                errors={errors}
                defaultValue={value}
                type={type}
                register={register}
                rules={rules}
                name={name}
                label={label}
                cl='user-settings-form__input'
              />
            </div>
          )
        })}
        {divider && <Divider />}
        {checkboxText && (
          <FormControlLabel
            {...register('checkbox', { required: true })}
            sx={{ mr: 0, width: '100%', whiteSpace: 'break-spaces', mt: 1, mb: 2.5 }}
            control={<Checkbox defaultChecked />}
            label={checkboxText}
          />
        )}
        {error.errorText && <FormError {...error} />}
        <Button
          component='button'
          type='submit'
          variant='contained'
          color='primary'
          className='user-settings-form'
          sx={{ width: '100%' }}
          disabled={!isValid}
        >
          {submitText}
        </Button>

        {footer && (
          <footer className='user-settings-form__footer'>
            {footer[0]}
            <span className='user-settings-form__footer-span'>
              <Link to={`/${footer[1].toLowerCase().split(' ').join('-')}`}> {footer[1]}</Link>
            </span>
          </footer>
        )}
      </>
    </form>
  )
}
