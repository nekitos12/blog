import React from 'react';
import './form-error.scss'
import {Link} from "react-router-dom";

interface IFormError {
    errorText: string
    link?: {
        text?: string
        address?: string
    }

}
export default function FormError({errorText, link}:IFormError) {
    return (
        <div className="form-error">
            {errorText}
            {link && <Link to={link.address || '/'}>{`Перейти на ${link.text || 'главную'}?`}</Link>}
        </div>
    );
}
