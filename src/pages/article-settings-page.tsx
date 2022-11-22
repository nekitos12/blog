import React from 'react'

import ArticleCreateForm from '../components/article-create-form'
import ArticleEditForm from '../components/article-edit-form'

const ArticleSettingsPage = ({ edit }: { edit?: boolean }) => {
  return <div className='article-settings-page'>{edit ? <ArticleEditForm /> : <ArticleCreateForm />}</div>
}

export default ArticleSettingsPage
