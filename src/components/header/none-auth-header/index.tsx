import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

export default function NoneAuthHeader () {
    return (
        <>
            <Link to="/sign-in" className="app-header__link">
                <Button variant="text" className="app-header__signin profile__button" color="secondary">Sign In</Button>
            </Link>
            <Link to="/sign-up" className="app-header__link">
                <Button variant="outlined" className="app-header__signup profile__button" color="success">Sign Up</Button>
            </Link>

        </>
    );
};