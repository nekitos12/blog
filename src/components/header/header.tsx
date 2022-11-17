import React, {useContext} from 'react';
import './header.scss';
import {Link} from "react-router-dom";
import NoneAuthHeader from "./none-auth-header";
import AuthHeader from "./auth-header";
import {useAppSelector} from "../../hooks/useTypedSelector";
import {CurrentUserContext} from "../../services/context/userLocal";


export default function Header() {
    const isAuth = useContext(CurrentUserContext)
  return (
    <header className="app-header">
        <Link to="/" className="app-header__link">
            <div className="app-header__title">Realworld Blog</div>
        </Link>
        <div className="app-header__profile profile">
            {isAuth ? <AuthHeader/> : <NoneAuthHeader/>}
        </div>
    </header>
  );
}
