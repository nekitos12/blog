import React, { useContext, useState } from 'react'
import './article-container.scss'
import { CircularProgress, Pagination, PaginationItem, Box } from '@mui/material'
import { Link, Redirect } from 'react-router-dom'

import { IArticle } from '../../models/types/article'
import Article from '../article'
import { useFetchAllArticleQuery } from '../../services/articleService'
import { CurrentUserContext } from '../../services/context/user'
import { useAuth } from '../../hooks/useAuth'

export default function ArticleContainer() {
  const [page, setPage] = useState(0)
  const { token } = useAuth()
  const { data: articleData, isFetching } = useFetchAllArticleQuery({ token, page: page || 1 })

  return (
    <>
      <ul className='article-container'>
        {isFetching && !articleData && (
          <Box sx={{ display: 'flex', mt: 3, justifyContent: 'center', position: 'absolute' }}>
            <CircularProgress />
          </Box>
        )}
        {articleData &&
          articleData.articles.map(article => (
            <li key={article.slug}>
              <Article {...article} />
            </li>
          ))}
      </ul>
      {articleData && (
        <Pagination
          sx={{ mx: 'auto', width: 'fit-content' }}
          count={Math.ceil(articleData.articlesCount / 5)}
          page={page || 1}
          onChange={(_, num) => setPage(num)}
          shape='rounded'
          color='primary'
          renderItem={item => <PaginationItem component={Link} to={`/articles/?page=${item.page}`} {...item} />}
        />
      )}
    </>
  )
}
