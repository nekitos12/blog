import React from 'react';

import {Link, useHistory} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {resetUser} from "../../../store/slice/userSlice";
import {Button} from "@mui/material";

export default function AuthHeader ({username, image}: { username: string, image: string }) {
    const dispatch = useAppDispatch()
    const {push} = useHistory()
    const handleClick = () => {
        localStorage.clear()
        dispatch(resetUser({token: ''}))
        push('/')
    }

    const handleUserClick =()=>{
        push('/profile')
    }
    return (
        <>
            <Link to="/new-article" className="app-header__link">
                <Button variant="outlined" className="app-header__create-article" color="success">Create
                    article</Button>
            </Link>
                <div onClick={handleUserClick} className="app-header__link">
                    <div className="profile__button app-header__user">
                        <div className="app-header__username" style={{position: `${username ? 'inherit' : 'absolute'}`}}>{username || ''}</div>

                        <img src={image} className="app-header__userphoto"/>
                    </div>
                </div>

            <Link to="/" className="app-header__link">
                <Button variant="outlined" className="app-header__logout profile__button" color="secondary"
                        onClick={handleClick}>Log out</Button>
            </Link>
        </>
    );
};
