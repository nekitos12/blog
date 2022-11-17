import {useAuth} from "../hooks/useAuth";
import ArticleContainer from "../components/article-container";
import React from "react";
import {Redirect} from "react-router-dom";
import {useAppSelector} from "../hooks/useTypedSelector";

export default function HomePage () {
    const user= useAppSelector(state => state.user)
    const { isAuthLocal } = useAuth()
    console.log('isAuthLocal', isAuthLocal)
    return (
        <>
            {user.isAuth || isAuthLocal ? <Redirect to="/articles" /> : <Redirect to="/sign-in" /> }
        </>

    );
}