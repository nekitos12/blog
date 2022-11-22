import {useAuth} from "../hooks/useAuth";
import ArticleContainer from "../components/article-container";
import React from "react";
import {Redirect} from "react-router-dom";
import {useAppSelector} from "../hooks/useTypedSelector";

export default function HomePage () {
    return (
        <>
            <Redirect to="/articles" />
        </>

    );
}