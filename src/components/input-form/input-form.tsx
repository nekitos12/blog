import React from 'react';
import './input-form.scss';
import {IUserFormFieldType} from "../../models/types/formInputRules";
import {UseFormRegister, UseFormReturn} from "react-hook-form";
import {IUserForm} from "../user-settings-form/user-settings-form";

interface IInput {
    name: string
    label: string
    cl?: string
    errors: any
    type: string
    register: UseFormRegister<IUserForm>
    rules: IUserFormFieldType
}
export default function InputForm({register, type, label, name, cl, rules, errors}:IInput) {
    return (
      <label className="label">
          {label}
          <input
              // @ts-ignore
              {...register(name, rules)}
              placeholder={label}
              type={type}
              name={name}
              className={`label__input ${cl || ''} ${errors?.[name]?.message && 'label__input_error'}`}
          />
          {errors?.[name] && <span className="label__error">{errors?.[name]?.message}</span>}
      </label>
  )
}
