import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IArticle} from "../models/types/article";

interface ArticleRequest {
    articles: IArticle[]
    article?: IArticle
    articlesCount: number
}

export const articleAPI = createApi({
    reducerPath: 'articleAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://blog.kata.academy/api/'}),
    endpoints: (build) => ({
        fetchAllArticle: build.query<ArticleRequest, number>({
            query: (page = 0) => ({
                url:`/articles?limit=5${page && `&offset=${(page-1)*5}`}`
            })
        }),
        fetchCurrentArticle: build.query<ArticleRequest, string>({
            query: (slug='') => ({
                url:`/articles/${slug}`
            })
        })
    })
})

export const { useFetchAllArticleQuery, useFetchCurrentArticleQuery } = articleAPI