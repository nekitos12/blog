import React from 'react';
import './header.scss';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import NoneAuthHeader from "./none-auth-header";
import AuthHeader from "./auth-header";

export default function Header() {
    const { isAuth } = useAuth()
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
