import React from 'react';
import './article.scss';
import {IArticle} from "../../types/article";
import format from 'date-fns/format'
import {Link} from "react-router-dom";

export default function Article({slug='', author, tagList,  favoritesCount, title='',  createdAt='', body, description}: IArticle) {
    const getCutText = (text: string, maxLength = 80): string => {
        return  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
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

                        <div className="article__likes">{favoritesCount}</div>
                    </div>
                    <ul className="article__tag-list">
                        {tagList?.map(tag => tag ? <li>{tag}</li> : null)}
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
            <p className="article__body">
                {description}
            </p>
        </article>
    );
}
