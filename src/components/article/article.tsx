import React, {FC, useContext, useState} from 'react';
import './article.scss';
import {IArticle} from "../../models/types/article";
import format from 'date-fns/format'
import {Link, useHistory} from "react-router-dom";
import ArticleFull from "../article-full";
import {Button} from "@mui/material";
import {CurrentUserContext} from "../../services/context/userLocal";
import {useDeleteArticleMutation, useFavouriteArticleMutation} from "../../services/articleService";
import {useAuth} from "../../hooks/useAuth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {CheckedHeart, DefaultHeart} from "../icon/heart";
interface IArticleProps {
    slug?: string | undefined,
    title?: string | undefined,
    description?: string | undefined,
    body?: string | undefined,
    tagList?: Array<string> | undefined,
    createdAt?: string | undefined,
    updatedAt?: string | undefined,
    favorited?: boolean ,
    full?: boolean
    favoritesCount?: number | undefined,
    author?: {
        username: string | undefined,
        bio?: string | undefined,
        image?: string | undefined,
        following?: true | undefined
    }
}
export default function Article({favorited, slug='', author, tagList, full= false, favoritesCount, title='',  createdAt='', body, description}: IArticleProps) {
    const { isAuth } = useContext(CurrentUserContext)
    const [deleteArticle, {}] = useDeleteArticleMutation()
    const [likeArticle, {}] = useFavouriteArticleMutation()

    const {token} = useAuth()
    const {push} = useHistory()

    const getCutText = (text: string, maxLength = 80): string => {
        return  text.length > maxLength ? `${text.slice(0, maxLength)}` : text
    }
    async function handleDelete (slug) {
        await deleteArticle({slug, token})
        push('/')
    }

    const handleEdit = () => push(`/articles/${slug}/edit`)
    const handleLike = () => {
        likeArticle({slug, token, isFavourite: !favorited})
    }
    console.log(favorited)
    const articleCreatedAt = format(new Date(createdAt), 'LLLL d, y')
    return (
        <article className="article">
            <header className="article__header">
                <div className="article__descr">
                    <div className="article__title-wrapper">
                        <Link to={`/articles/${slug}`}>
                            <h1 className="article__title">{getCutText(title)}</h1>
                        </Link>

                        <div className="article__likes" onClick={()=>handleLike()}>

                            {favorited ? <CheckedHeart cl="article__heart article__heart_checked"/>:<DefaultHeart cl="article__heart"/>}

                            {favoritesCount}</div>
                    </div>
                    <ul className="article__tag-list">
                        {tagList?.map((tag, index) => tag ? <li key={index}>{getCutText(tag, 30)}</li> : null)}
                    </ul>

                </div>
                <div className="article__profile">
                    <div className="article__profile-left">
                        <div className="article__profile-name">
                            {author?.username}
                        </div>
                        <div className="article__profile-created">
                            {articleCreatedAt}
                        </div>
                    </div>

                    <img className="article__profile-image" src={require("./1550855401-cc_light.png")}/>
                </div>
                {full && isAuth && <div style={{position: "absolute", top: "60px", right: 0}}>
                    <Button color="error" className="article__header-btn" variant="outlined" onClick={()=>handleDelete(slug)}>Delete</Button>
                        <Button color="success" variant="outlined" className="article__header-btn" onClick={handleEdit}>Edit</Button>

                </div>}

            </header>
            <p className="article__descr">
                {description && getCutText(description, 100)}
            </p>
            {body && full ? <div className="article__body">
                <ArticleFull text={body}/>
            </div> : null}
        </article>
    );
}
