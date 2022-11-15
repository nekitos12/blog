import React, { useState} from 'react';
import './app.scss';
import Header from "../header";
import ArticleContainer from "../article-container";
import {Route, Switch} from "react-router-dom";
import SignInFormPage from "../../pages/sign-in-form-page";
import SignUpFormPage from "../../pages/sign-up-form-page";
import ArticlePage from "../../pages/article-page";
import {useAppSelector} from "../../hooks/useTypedSelector";
import HomePage from '../../pages/home-page';

export default function App() {
    const state = useAppSelector(state=>state.form)
    console.log(state)
    return (
        <div className="app">
            <Header/>
            <Switch>
                <Route exact path="/"><HomePage/></Route>
                <Route exact path="/sign-in"><SignInFormPage /></Route>
                <Route exact path="/sign-up"><SignUpFormPage /></Route>
                <Route exact path="/articles"><ArticleContainer /></Route>
                <Route exact path="/articles/:slug"><ArticlePage /></Route>
            </Switch>
        </div>
    );
}
