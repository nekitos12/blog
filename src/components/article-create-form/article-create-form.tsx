import React, { useContext } from 'react'
import './article-create-form.scss'
import { Redirect, useHistory } from 'react-router-dom'

import { titleField, descrField, bodyField } from '../../models/articleInputField'
import ArticleSettingsForm from '../article-settings-form'
import { IArticleForm } from '../article-settings-form/article-settings-form'
import { useCreateArticleMutation } from '../../services/articleService'
import { useAuth } from '../../hooks/useAuth'
import { CurrentUserContext } from '../../services/context/user'

export default function ArticleCreateForm() {
  const { isAuth } = useContext(CurrentUserContext)
  const [createArticle] = useCreateArticleMutation()
  const { push } = useHistory()
  const { token } = useAuth()
  const inputField = [titleField, descrField, bodyField]
  if (!isAuth) {
    return <Redirect to='/sign-in' />
  }

  async function onSubmit(data: IArticleForm) {
    try {
      const { tags: formTags, title, body, description } = data
      const tags = formTags.reduce((arr: string[], { tag }) => (tag ? [...arr, tag] : arr), [])
      const article = { tagList: tags, body, title, description }
      const a = await createArticle({ body: article, token })
      push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='article-create-form'>
      <ArticleSettingsForm
        onSuccessSubmit={onSubmit}
        submitText='Send'
        header='Create new article'
        inputField={inputField}
      />
    </div>
  )
}
