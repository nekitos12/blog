import React from 'react';
import './user-settings-form.scss'
import InputForm from "../input-form";
import {Button, Checkbox, Divider, FormControlLabel} from "@mui/material";

interface IInputField {
    name: string
    label: string
}

interface IUserForm {
    header: string
    submitText: string
    inputField: Array<IInputField>
    classes?: string
    checkboxText?: string
    footer?: Array<string>
    divider?: boolean
}

export default function UserSettingsForm({ checkboxText, inputField, footer, header, submitText, divider, classes}:IUserForm) {
    return (
        <div className="user-settings-form">
            <>
                <header className="user-settings-form__header">{header}</header>
                {inputField.map(({name, label}) => (
                        <InputForm name={name} label={label} cl="user-settings-form__input"/>
                    )
                )}
                {divider && <Divider/>}
                {checkboxText &&
                    <FormControlLabel sx={{mr: 0, width: '100%', whiteSpace: 'break-spaces', mt: 1, mb: 2.5}}
                                      control={<Checkbox defaultChecked/>} label={checkboxText}/>}
                <Button component="div" variant="contained" color="primary" className="user-settings-form"
                        sx={{width: '100%'}}>{submitText}</Button>
                {footer && (<footer className="user-settings-form__footer">
                    {footer[0]}
                    <a href="#" className="user-settings-form__footer-span"> {footer[1]}</a>
                </footer>)}
            </>
        </div>
    );
}
