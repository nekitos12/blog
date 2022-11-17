import React from 'react';
import {Button} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {resetUser} from "../../../store/slice/userSlice";

export default function AuthHeader () {
    const dispatch = useAppDispatch()
    const {push} = useHistory()
    const handleClick = () => {
        localStorage.clear()
        dispatch(resetUser())
        push('/')
    }
    return (
        <>
            <Link to="/sign-in" className="app-header__link">
                <Button variant="text" className="app-header__signin profile__button" color="secondary" onClick={handleClick}>Log out</Button>
            </Link>
        </>
    );
};
