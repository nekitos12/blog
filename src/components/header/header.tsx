import React, { useContext } from 'react'
import './header.scss'
import { Link } from 'react-router-dom'

import { CurrentUserContext } from '../../services/context/user'

import AuthHeader from './auth-header'
import NoneAuthHeader from './none-auth-header'

export default function Header() {
  const { user, isAuth, userLocal } = useContext(CurrentUserContext)
  return (
    <header className='app-header'>
      <Link to='/' className='app-header__link'>
        <div className='app-header__title'>Realworld Blog</div>
      </Link>
      <div className='app-header__profile profile'>
        {isAuth ? (
          <AuthHeader image={userLocal.image || user?.image} username={userLocal.username || user?.username || ''} />
        ) : (
          <NoneAuthHeader />
        )}
      </div>
    </header>
  )
}
