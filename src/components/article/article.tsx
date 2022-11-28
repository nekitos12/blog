import React, { useContext, useState } from 'react'
import './article.scss'
import format from 'date-fns/format'
import { Link, useHistory } from 'react-router-dom'
import Button from '@mui/material/Button'

import ArticleFull from '../article-full'
import { CurrentUserContext } from '../../services/context/user'
import { useDeleteArticleMutation, useFavouriteArticleMutation } from '../../services/articleService'
import { useAuth } from '../../hooks/useAuth'
import { CheckedHeart, DefaultHeart } from '../icon/heart'
interface IArticleProps {
  slug?: string | undefined
  title?: string | undefined
  description?: string | undefined
  body?: string | undefined
  tagList?: Array<string> | undefined
  createdAt?: string | undefined
  updatedAt?: string | undefined
  favorited?: boolean
  full?: boolean
  favoritesCount?: number | undefined
  author?: {
    username: string | undefined
    bio?: string | undefined
    image?: string | undefined
    following?: true | undefined
  }
}
export default function Article({
  favorited,
  slug = '',
  author,
  tagList,
  full = false,
  favoritesCount,
  title = '',
  createdAt = '',
  body,
  description,
}: IArticleProps) {
  const { isAuth, user } = useContext(CurrentUserContext)
  const [deleteArticle, {}] = useDeleteArticleMutation()
  const [likeArticle, {}] = useFavouriteArticleMutation()
  const { token } = useAuth()
  const [isDeleteClick, setDeleteClick] = useState(false)
  const { push } = useHistory()

  const getCutText = (text: string, maxLength = 70): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}` : text
  }
  async function handleDelete(sl) {
    await deleteArticle({ slug: sl, token })
    push('/')
  }
  const defaultCringeUser = 'https://static.productionready.io/images/smiley-cyrus.jpg'
  const handleEdit = () => push(`/articles/${slug}/edit`)
  const handleLike = () => {
    console.log('я тут')
    likeArticle({ slug, token, isFavourite: !favorited })
  }
  console.log(favorited)
  const articleCreatedAt = format(new Date(createdAt), 'LLLL d, y')
  return (
    <article className='article'>
      <header className='article__header'>
        <div className='article__descr'>
          <div className='article__title-wrapper'>
            <Link to={`/articles/${slug}`}>
              <h1 className='article__title'>{getCutText(title)}</h1>
            </Link>

            <div className='article__likes' onClick={() => handleLike()}>
              {favorited ? (
                <CheckedHeart cl='article__heart article__heart_checked' />
              ) : (
                <DefaultHeart cl='article__heart' />
              )}

              {favoritesCount}
            </div>
          </div>
          <ul className='article__tag-list'>
            {tagList?.map((tag, index) => (tag ? <li key={index}>{getCutText(tag, 30)}</li> : null))}
          </ul>
        </div>
        <div className='article__profile'>
          <div className='article__profile-left'>
            <div className='article__profile-name'>{author?.username}</div>
            <div className='article__profile-created'>{articleCreatedAt}</div>
          </div>

          <img
            alt='avatar'
            className='article__profile-image'
            src={
              (author?.image !== defaultCringeUser && author?.image) ||
              require('./../../models/img/header/defaultUser.png')
            }
          />
        </div>
        {full && isAuth && user.username === author?.username && (
          <div className='article__settings'>
            <dialog className='article__dialog' open={isDeleteClick}>
              <div className='article__dialog-text'>
                <div className='article__dialog-text-icon'></div>
                Are you sure to delete this article?
              </div>
              <div className='article__dialog-btn-list'>
                <Button
                  className='article__dialog-btn'
                  color='secondary'
                  variant='outlined'
                  onClick={() => setDeleteClick(false)}
                >
                  No
                </Button>
                <Button
                  className='article__dialog-btn'
                  color='info'
                  variant='contained'
                  onClick={() => handleDelete(slug)}
                >
                  Yes
                </Button>
              </div>
            </dialog>
            <Button
              color='error'
              className='article__header-btn'
              variant='outlined'
              onClick={() => setDeleteClick(true)}
            >
              Delete
            </Button>
            <Button color='success' variant='outlined' className='article__header-btn' onClick={handleEdit}>
              Edit
            </Button>
          </div>
        )}
      </header>
      <p className='article__descr'>{description && getCutText(description, 100)}</p>
      {body && full ? (
        <div className='article__body'>
          <ArticleFull text={body} />
        </div>
      ) : null}
    </article>
  )
}
