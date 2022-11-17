import React, {useContext, useMemo} from 'react';
import './header.scss';
import {Link} from "react-router-dom";
import NoneAuthHeader from "./none-auth-header";
import AuthHeader from "./auth-header";
import {useAppSelector} from "../../hooks/useTypedSelector";
import {CurrentUserContext} from "../../services/context/userLocal";


export default function Header() {
    // const user = useAppSelector(state => state.user.username)
    const a = useMemo(()=>localStorage.getItem('user')?.['username'], [])
    const isAuth = useContext(CurrentUserContext)
    const { username } = useAppSelector(state => state.user)

    console.log(a, username)
  return (
    <header className="app-header">
        <Link to="/" className="app-header__link">
            <div className="app-header__title">Realworld Blog</div>
        </Link>
        <div className="app-header__profile profile">
            {isAuth ? <AuthHeader username={username || a?.['username'] || ''}/> : <NoneAuthHeader/>}
        </div>
    </header>
  );
}
