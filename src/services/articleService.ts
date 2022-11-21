import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IArticle} from "../models/types/article";

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

interface DeleteArticleRequest {
    token: string
    slug: string
}

export const articleAPI = createApi({
    reducerPath: 'articleAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://blog.kata.academy/api/'}),
    tagTypes: ['post'],
    endpoints: (build) => ({
        fetchAllArticle: build.query<ArticleResponse, number>({
            query: (page = 0) => ({
                url:`/articles?limit=5${page && `&offset=${(page-1)*5}`}`
            }),
            providesTags: ['post']
        }),
        fetchCurrentArticle: build.query<ArticleResponse, string>({
            query: (slug='') => ({
                url:`/articles/${slug}`
            })
        }),
        createArticle: build.mutation<CreateArticleResponse, CreateArticleRequest>({
            query: ({body, token}) => {
                return {
                    url: '/articles',
                    method: 'POST',
                    headers: {
                        Authorization: `Token ${token}`
                    },
                    body: {article: body}
                }
            },
            invalidatesTags: ['post']
        }),
        updateArticle: build.mutation<CreateArticleResponse, CreateArticleRequest>({
            query: ({body, token, slug}) => {
                return {
                    url: `/articles/${slug}`,
                    method: 'PUT',
                    headers: {
                        Authorization: `Token ${token}`
                    },
                    body: {article: body}
                }
            },
            invalidatesTags: ['post']
        }),
        deleteArticle: build.mutation<string, DeleteArticleRequest>({
            query: ({ token, slug}) => {
                return {
                    url: `/articles/${slug}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Token ${token}`
                    },
                }
            },
            invalidatesTags: ['post']
        }),

    })
})

export const { useFetchAllArticleQuery, useFetchCurrentArticleQuery, useCreateArticleMutation, useUpdateArticleMutation, useDeleteArticleMutation } = articleAPI