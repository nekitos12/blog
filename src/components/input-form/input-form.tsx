import React from 'react';
import './input-form.scss';

interface IInput {
    name: string
    label: string
    cl?: string
}
export default function InputForm({label, name, cl}:IInput) {
  return (
      <label className="label">
          {label}
          <input placeholder={label} type="text" name={name} className={`label__input ${cl || ''}`}/>
      </label>
  )
}
