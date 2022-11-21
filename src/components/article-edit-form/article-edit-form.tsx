import React, {useContext, useState} from 'react';
import './article-edit-form.scss'
import UserSettingsForm from "../user-settings-form";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {Link, Redirect, useHistory, useParams} from "react-router-dom";
import {setUser} from "../../store/slice/userSlice";
import {titleField, descrField, bodyField, tagField} from "../../models/articleInputField";
import { IUserForm } from '../user-settings-form/user-settings-form';
// import {UserFormError, UserFormErrorMessage} from "../../models/types/userRequestError";
import {useSetNewUserMutation} from "../../services/userService";
import { Buffer } from 'buffer'
import ArticleSettingsForm from '../article-settings-form';
import {IArticleForm} from "../article-settings-form/article-settings-form";
import {useFetchCurrentArticleQuery, useUpdateArticleMutation} from "../../services/articleService";
import {useAuth} from "../../hooks/useAuth";
import {CurrentUserContext} from "../../services/context/userLocal";


export default function ArticleEditForm() {
    const { isAuth } = useContext(CurrentUserContext)
    const { slug } = useParams<{slug: string}>()
    const { data } = useFetchCurrentArticleQuery(slug)
    console.log(slug)
    console.log(data?.article)
    const [updateArticle, {}] = useUpdateArticleMutation()
    const {push} = useHistory()
    const {token} = useAuth()
    const inputField = [
        titleField,
        descrField,
        bodyField,
    ];

    if (!isAuth) {
        return <Redirect to="/"/>
    }

    async function onSubmit(data: IArticleForm) {
        try {
            const {tags: formTags, title, body, description} = data
            const tags = formTags.reduce((arr: string[], {tag}) => tag ? [...arr, tag] : arr,[])
            console.log(tags)
            const article = {tagList: tags, body, title, description}
            const a = await updateArticle({body: article, token, slug})
            localStorage.setItem('article', JSON.stringify(article))
            push('/')
        } catch (e) {
            console.log(e)
            // if (e instanceof Error) {
            //     console.log(e)
            //     const a = e.message.slice(e.message.indexOf('auth') + 5, -2)
            //     console.log(a)
            //     switch (a) {
            //         case UserFormError.emailInUse:
            //             setErrorForm(UserFormErrorMessage.emailInUse)
            //             break
            //         default:
            //             setErrorForm('Произошла ошибка')
            //     }
            // }
        }
    }

  return (
      <div className="article-create-form">
          <ArticleSettingsForm article={data?.article} tagList={data?.article?.tagList} onSuccessSubmit={onSubmit} submitText="Send" header="Edit article" inputField={inputField} />
      </div>


  );
}
