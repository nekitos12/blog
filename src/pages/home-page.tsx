import {useAuth} from "../hooks/useAuth";
import ArticleContainer from "../components/article-container";
import React from "react";
import {Redirect} from "react-router-dom";

export default function HomePage () {
    const { isAuth } = useAuth()
    return (
        <>
            {isAuth ? <ArticleContainer defPage='1'/> : <Redirect to="/sign-in" /> }
        </>

    );
}