import React from 'react'
import { useParams } from 'react-router-dom'

import { useFetchCurrentArticleQuery } from '../services/articleService'
import Article from '../components/article'
import ArticleFull from '../components/article-full'
import { useAuth } from '../hooks/useAuth'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { token } = useAuth()
  const { data } = useFetchCurrentArticleQuery({ slug, token })
  if (!data) return null
  console.log(data.article)
  return (
    <div className='article-container'>
      <Article full={true} {...data?.article} />
    </div>
  )
}
