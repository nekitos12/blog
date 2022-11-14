import React, {useState} from 'react';
import './app.scss';
import Header from "../header";
import SignUpForm from "../sign-up-form";
import SignInForm from "../sign-in-form";

export default function App() {
    const [isReg, setReg] = useState(false)
    const [wantToReg, setWantToReg] = useState(false)
    return (
        <div className="app">
            <Header setReg={setReg} setWantToReg={setWantToReg}/>
            {isReg && <SignInForm/>}
            {wantToReg && <SignUpForm/>}
        </div>
    );
}
