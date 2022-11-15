import React from 'react';
import './input-form.scss';

import {changeInput} from "../../store/slice/formSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useTypedSelector";

interface IInput {
    name: string
    label: string
    cl?: string
}
export default function InputForm({label, name, cl}:IInput) {
    const formState= useAppSelector(state => state.form)
    const dispatch = useAppDispatch()
  return (
      <label className="label">
          {label}
          <input value={formState[name]} placeholder={label} type="text" name={name} className={`label__input ${cl || ''}`} onChange={(event) => {
              dispatch(changeInput({name: `${name}`, value: event.target.value}))
          }}/>
      </label>
  )
}
