import React from 'react';
import './header.scss';
import {Button} from "@mui/material";

interface IHeader {
    setReg: (b: boolean)=>void
    setWantToReg: (b: boolean)=>void
}
export default function Header({setReg, setWantToReg}:IHeader) {
  return (
    <header className="app-header">
        <div className="app-header__title">Realworld Blog</div>
        <div className="app-header__profile profile">
            <Button variant="text" className="app-header__signin profile__button" onClick={()=> {
                setReg(true)
                setWantToReg(false)
            }}>Sign In</Button>
            <Button variant="outlined" className="app-header__signup profile__button" onClick={()=> {
                setWantToReg(true)
                setReg(false)
            }}>Sign Up</Button>

        </div>
    </header>
  );
}
