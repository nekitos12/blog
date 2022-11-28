import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import ProfileForm from '../components/profile-form'
import { CurrentUserContext } from '../services/context/user'

const ProfileUserPage = () => {
  const { isAuth } = useContext(CurrentUserContext)
  if (!isAuth) {
    return <Redirect to='/sign-in' />
  }
  return (
    <div className='profile-page'>
      <ProfileForm />
    </div>
  )
}

export default ProfileUserPage
