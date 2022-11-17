import React, {FC} from 'react';
import './article.scss';
import {IArticle} from "../../models/types/article";
import format from 'date-fns/format'
import {Link} from "react-router-dom";
interface IArticleProps {
    slug?: string | undefined,
    title?: string | undefined,
    description?: string | undefined,
    body?: string | undefined,
    tagList?: Array<string> | undefined,
    createdAt?: string | undefined,
    updatedAt?: string | undefined,
    favorited?: boolean | undefined,
    favoritesCount?: number | undefined,
    author?: {
        username: string | undefined,
        bio?: string | undefined,
        image?: string | undefined,
        following?: true | undefined
    }
    children?: JSX.Element | null
}
export default function Article({slug='', author, tagList,  favoritesCount, title='',  createdAt='', body, description, children}: IArticleProps) {
    const getCutText = (text: string, maxLength = 80): string => {
        return  text.length > maxLength ? `${text.slice(0, maxLength)}` : text
    }
    const articleCreatedAt = format(new Date(createdAt), 'LLLL d, y')
    return (
        <article className="article">
            <header className="article__header">
                <div className="article__descr">
                    <div className="article__title-wrapper">
                        <Link to={`/articles/${slug}`}>
                            <h1 className="article__title">{getCutText(title)}</h1>
                        </Link>

                        <div className="article__likes">❤{favoritesCount}</div>
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
            </header>
            <p className="article__descr">
                {description && getCutText(description, 100)}
            </p>
            {children}
        </article>
    );
}
