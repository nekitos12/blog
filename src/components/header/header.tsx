import React, {useContext, useEffect, useMemo} from 'react';
import './header.scss';
import {Link} from "react-router-dom";
import NoneAuthHeader from "./none-auth-header";
import AuthHeader from "./auth-header";
import {useAppSelector} from "../../hooks/useTypedSelector";
import {CurrentUserContext} from "../../services/context/userLocal";
import {useAuth} from "../../hooks/useAuth";



export default function Header() {
    const {user, isAuth, userLocal} = useContext(CurrentUserContext)
    console.log(user)
    console.log(isAuth)
    console.log(userLocal)
  return (
    <header className="app-header">
        <Link to="/" className="app-header__link">
            <div className="app-header__title">Realworld Blog</div>
        </Link>
        <div className="app-header__profile profile">
            {isAuth ? <AuthHeader username={userLocal.username || user?.username  || ''}/> : <NoneAuthHeader/>}
        </div>
    </header>
  );
}
