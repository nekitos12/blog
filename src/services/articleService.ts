import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IArticle } from '../models/types/article'

interface ArticleResponse {
  articles: IArticle[]
  article?: IArticle
  articlesCount: number
}

interface CreateArticleResponse {
  [key: string]: string
}

interface CreateArticleRequest {
  token: string
  slug?: string
  body: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}

interface LikeArticleRequest {
  token: string
  slug: string
}

interface DeleteArticleRequest {
  token: string
  slug: string
}

interface FavouriteArticleRequest {
  token: string
  slug: string
  isFavourite: boolean
}
interface FetchArticleRequest {
  token: string
  page: number
}

export const articleAPI = createApi({
  reducerPath: 'articleAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  tagTypes: ['post'],
  endpoints: build => ({
    fetchAllArticle: build.query<ArticleResponse, FetchArticleRequest>({
      query: ({ token, page }) => ({
        url: `/articles?limit=5${page && `&offset=${(page - 1) * 5}`}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      providesTags: ['post'],
    }),
    fetchCurrentArticle: build.query<ArticleResponse, LikeArticleRequest>({
      query: ({ slug = '', token }) => ({
        url: `/articles/${slug}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      providesTags: ['post'],
    }),
    createArticle: build.mutation<CreateArticleResponse, CreateArticleRequest>({
      query: ({ body, token }) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: { article: body },
      }),
      invalidatesTags: ['post'],
    }),
    updateArticle: build.mutation<CreateArticleResponse, CreateArticleRequest>({
      query: ({ body, token, slug }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: { article: body },
      }),
      invalidatesTags: ['post'],
    }),
    deleteArticle: build.mutation<string, DeleteArticleRequest>({
      query: ({ token, slug }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['post'],
    }),
    favouriteArticle: build.mutation<string, FavouriteArticleRequest>({
      query: ({ token, slug, isFavourite }) => ({
        url: `/articles/${slug}/favorite`,
        method: `${isFavourite ? 'POST' : 'DELETE'}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['post'],
    }),
  }),
})

export const {
  useFetchAllArticleQuery,
  useFetchCurrentArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useFavouriteArticleMutation,
} = articleAPI
