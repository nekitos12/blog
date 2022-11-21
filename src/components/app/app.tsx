import React, {useEffect, useState} from 'react';
import './app.scss';
import Header from "../header";
import ArticleContainer from "../article-container";
import {Route, Switch} from "react-router-dom";
import SignInFormPage from "../../pages/sign-in-form-page";
import SignUpFormPage from "../../pages/sign-up-form-page";
import ArticlePage from "../../pages/article-page";
// import {useAppSelector} from "../../hooks/useTypedSelector";
import HomePage from '../../pages/home-page';
import {useAuth} from "../../hooks/useAuth";
import {CurrentUserContext} from "../../services/context/userLocal";
import {useGetCurrentUserMutation, useLoginUserMutation} from "../../services/userService";
import {useAppSelector} from "../../hooks/useTypedSelector";
import ProfileUserPage from "../../pages/profile-user-page";
import ArticleSettingsPage from "../../pages/article-settings-page";

export default function App() {
    const { isAuth, token, username }= useAppSelector(state => state.logUser)
    const [user, setUser] = useState({})
    const userLocal = useAuth()
    const [getUser, {}] = useGetCurrentUserMutation()
    const [loginUser, {}] = useLoginUserMutation()
    async function getU (token){
        const userResponse = await getUser(token)
        console.log(userResponse)
        // @ts-ignore
        setUser(userResponse.data.user)
    }
    useEffect(()=>{
        if(userLocal.token){
            console.log('логинюсь')
            getU(userLocal.token)
        }

    }, [])


    useEffect(()=>{
        if (userLocal.token){
            console.log('получаю новые данные')
            getU(userLocal.token)
        }
    }, [token, userLocal.token, username])
    return (
        <CurrentUserContext.Provider value={{user, isAuth: isAuth || userLocal.isAuthLocal,userLocal }}>
            <div className="app">
                <Header/>
                <Switch>
                    <Route exact path="/"><HomePage/></Route>
                    <Route exact path="/sign-in"><SignInFormPage/></Route>
                    <Route exact path="/sign-up"><SignUpFormPage/></Route>
                    <Route exact path="/articles"><ArticleContainer/></Route>
                    <Route exact path="/articles/:slug"><ArticlePage/></Route>
                    <Route exact path="/articles/:slug/edit"><ArticleSettingsPage edit={true}/></Route>
                    <Route exact path="/profile"><ProfileUserPage/></Route>
                    <Route exact path="/new-article"><ArticleSettingsPage/></Route>
                </Switch>
            </div>
        </CurrentUserContext.Provider>

    );
}
