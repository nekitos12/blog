import React from 'react';
import './sign-up-form.scss'
import InputForm from "../input-form";
import {Button, Checkbox, Divider, FormControlLabel} from "@mui/material";

export default function SignUpForm() {
  return (
    <div className="sign-up-form">
        <header className="sign-up-form__header">Create new account</header>
        <InputForm placeholder="Username" name="username"  cl="sign-up-form__input"/>
        <InputForm placeholder="Email" name="email"  cl="sign-up-form__input"/>
        <InputForm placeholder="Password" name="password"  cl="sign-up-form__input"/>
        <InputForm placeholder="Repeat Password" name="repeatPassword" cl="sign-up-form__input"/>
        <Divider />
        <FormControlLabel sx={{mr: 0, width: '100%', whiteSpace: 'break-spaces', mt: 1, mb: 2.5 }} control={<Checkbox defaultChecked />} label="I agree to the processing of my personal information" />
        <Button component="div" variant="contained" color="primary" className="app-header__btn" sx={{width: '100%'}}>Create</Button>
        <footer className="sign-up-form__footer">
            Already have an account?
            <a className="sign-up-form__footer-span"> Sign In.</a>
        </footer>
    </div>
  );
}
