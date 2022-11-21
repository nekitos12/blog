import React from 'react';
import './user-settings-form.scss'
import InputForm from "../input-form";
import {Button, Checkbox, Divider, FormControlLabel} from "@mui/material";
import {Link} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUserFormFieldType} from "../../models/types/userInputRules";
import FormError from "./form-error";

interface IInputField {
    name: string
    label: string
    type: string
    rules: IUserFormFieldType
}

export interface IUserForm {
    username: string
    email: string
    password: string
    confirmPassword?: string
    avatarURL?: string
    newPassword: string
}

interface IUserSettingsForm {
    header: string
    submitText: string
    inputField: Array<IInputField>
    classes?: string
    checkboxText?: string
    footer?: Array<string>
    divider?: boolean
    onSuccessSubmit: SubmitHandler<IUserForm>
    error: {
        errorText: string
        link?: {
            text: string
            address: string
        }
    }
}



export default function UserSettingsForm({error, onSuccessSubmit, checkboxText, inputField, footer, header, submitText, divider, classes}:IUserSettingsForm) {
    const {register, handleSubmit, formState: { errors }, watch } = useForm<IUserForm>({
        mode: "onBlur"
    })
    const onSubmit:SubmitHandler<IUserForm> = (data) =>{
        alert(JSON.stringify(data))
        onSuccessSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="user-settings-form">
            <>

                <header className="user-settings-form__header">{header}</header>
                {inputField.map(({name, label,type , rules}) => {
                    if (name === 'confirmPassword') {
                        // @ts-ignore
                        rules.validate = (val: string) => {
                            if (watch('password') !== val) {
                                return "Ваши пароли не совпадают";
                            }
                        }
                    }
                    return (
                        <div key={name}>
                            <InputForm  errors={errors} type={type} register={register} rules={rules} name={name}
                                       label={label} cl="user-settings-form__input"/>
                        </div>);

                    }
                )}
                {divider && <Divider/>}
                {checkboxText &&
                    <FormControlLabel sx={{mr: 0, width: '100%', whiteSpace: 'break-spaces', mt: 1, mb: 2.5}}
                                      control={<Checkbox defaultChecked/>} label={checkboxText}/>}
                {error.errorText && <FormError {...error}/>}
                <Button  component="button" type="submit" variant="contained" color="primary"
                        className="user-settings-form"
                        sx={{width: '100%'}}>{submitText}</Button>

                {footer && (<footer className="user-settings-form__footer">
                    {footer[0]}
                    <span className="user-settings-form__footer-span">
                        <Link to={`/${footer[1].toLowerCase().split(' ').join('-')}`} > {footer[1]}</Link>
                    </span>

                </footer>)}
            </>
        </form>
    );
}
