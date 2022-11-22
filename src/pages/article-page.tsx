import React from 'react';
import {useParams} from "react-router-dom";
import {useFetchCurrentArticleQuery} from "../services/articleService";
import Article from "../components/article";
import ArticleFull from "../components/article-full";

export default function ArticlePage () {

    const { slug } = useParams<{slug: string}>()
    const { data } = useFetchCurrentArticleQuery(slug)
    if (!data) return null
    return (
        <div style={{width: "min-content", margin: 'auto', background: '#000'}}>
            <Article full={true} {...data?.article} />
        </div>
    );
};

