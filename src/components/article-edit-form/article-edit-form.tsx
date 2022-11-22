import React, {useContext} from 'react';
import './article-edit-form.scss'
import {Link, Redirect, useHistory, useParams} from "react-router-dom";
import {titleField, descrField, bodyField, tagField} from "../../models/articleInputField";
import ArticleSettingsForm from '../article-settings-form';
import {IArticleForm} from "../article-settings-form/article-settings-form";
import {useFetchCurrentArticleQuery, useUpdateArticleMutation} from "../../services/articleService";
import {useAuth} from "../../hooks/useAuth";
import {CurrentUserContext} from "../../services/context/user";


export default function ArticleEditForm() {
    const { isAuth } = useContext(CurrentUserContext)
    const { slug } = useParams<{slug: string}>()
    const { data } = useFetchCurrentArticleQuery(slug)

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
        }
    }

  return (
      <div className="article-create-form">
          <ArticleSettingsForm article={data?.article} tagList={data?.article?.tagList} onSuccessSubmit={onSubmit} submitText="Send" header="Edit article" inputField={inputField} />
      </div>


  );
}
