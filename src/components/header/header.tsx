import React from 'react';
import './header.scss';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

// interface IHeader {
//     setReg: (b: boolean)=>void
//     setWantToReg: (b: boolean)=>void
// }
export default function Header() {
  return (
    <header className="app-header">
        <Link to="/" className="app-header__link">
            <div className="app-header__title">Realworld Blog</div>
        </Link>
        <div className="app-header__profile profile">
            <Link to="/sign-in" className="app-header__link">
                <Button variant="text" className="app-header__signin profile__button" color="secondary" onClick={()=> {

                }}>Sign In</Button>
            </Link>
            <Link to="/sign-up" className="app-header__link">
                <Button variant="outlined" className="app-header__signup profile__button" color="success" onClick={()=> {

                }}>Sign Up</Button>
            </Link>


        </div>
    </header>
  );
}
