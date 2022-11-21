import React from 'react';
import './input-form.scss';
import {IUserFormFieldType} from "../../models/types/userInputRules";
import {UseFormRegister} from "react-hook-form";
import {IUserForm} from "../user-settings-form/user-settings-form";
import {IArticleFormFieldType} from "../../models/types/articleInputRules";
import {IArticleForm} from "../article-settings-form/article-settings-form";

interface IInput {
    name: string
    label?: string
    cl?: string
    errors: any
    type: string
    tag?: string
    defaultValue?: string
    placeholder?: string
    register: UseFormRegister<IUserForm> | UseFormRegister<IArticleForm>
    rules: IUserFormFieldType | IArticleFormFieldType
}
export default function InputForm({defaultValue, tag, register, type, label, name, cl, rules, errors, placeholder}:IInput) {
    return (
      <label className="label">
          {label || null}
          {tag !== 'textarea' ? <input
              // @ts-ignore
              {...register(name, rules)}
              placeholder={placeholder || label}
              type={type}
              defaultValue={defaultValue}
              name={name}
              className={`label__input ${cl || ''} ${(errors?.[name]?.message && 'label__input_error') || ''}`}
          /> : <textarea
              // @ts-ignore
              {...register(name, rules)}
              placeholder={placeholder || label}
              name={name}
              rows={10}
              defaultValue={defaultValue}
              className={`label__input ${cl || ''} ${(errors?.[name]?.message && 'label__input_error') || ''}`}
          />}

          {errors?.[name] && <span className="label__error">{errors?.[name]?.message}</span>}
      </label>
  )
}
