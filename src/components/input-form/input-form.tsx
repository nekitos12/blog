import React from 'react';
import './header.scss';
import {Button} from "@mui/material";
import { useTheme } from '@mui/material/styles';

interface IHeader {
    isReg: boolean
    setReg: (b: boolean)=>void
}
export default function Header({isReg,setReg}:IHeader) {
    const theme = useTheme()
    console.log(theme)
  return (
    <header className="app-header">
        <div className="app-header__title">Realworld Blog</div>
        <div className="app-header__profile">
            <Button variant="outlined" color="success" className="app-header__signup" onClick={()=>setReg(!isReg)}>Sign Up</Button>
        </div>


    </header>
  );
}
