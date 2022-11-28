import React, { useContext } from 'react'
import './article-edit-form.scss'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import { titleField, descrField, bodyField } from '../../models/articleInputField'
import ArticleSettingsForm from '../article-settings-form'
import { IArticleForm } from '../article-settings-form/article-settings-form'
import { useFetchCurrentArticleQuery, useUpdateArticleMutation } from '../../services/articleService'
import { useAuth } from '../../hooks/useAuth'
import { CurrentUserContext } from '../../services/context/user'

export default function ArticleEditForm() {
  const { isAuth } = useContext(CurrentUserContext)
  const { slug } = useParams<{ slug: string }>()
  const { token } = useAuth()
  const { data } = useFetchCurrentArticleQuery({ slug, token })
  const [updateArticle, {}] = useUpdateArticleMutation()
  const { push } = useHistory()
  const inputField = [titleField, descrField, bodyField]

  if (!isAuth) {
    return <Redirect to='/sign-in' />
  }

  async function onSubmit(formData: IArticleForm) {
    try {
      const { tags: formTags, title, body, description } = formData
      const tags = formTags.reduce((arr: string[], { tag }) => (tag ? [...arr, tag] : arr), [])
      const article = { tagList: tags, body, title, description }
      const a = await updateArticle({ body: article, token, slug })
      push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='article-create-form'>
      <ArticleSettingsForm
        article={data?.article}
        tagList={data?.article?.tagList}
        onSuccessSubmit={onSubmit}
        submitText='Send'
        header='Edit article'
        inputField={inputField}
      />
    </div>
  )
}
