import React, {useContext, useState} from 'react';
import './article-container.scss';
import {IArticle} from "../../models/types/article";
import Article from "../article";
import {CircularProgress, Pagination, PaginationItem, Box} from "@mui/material";
import {useFetchAllArticleQuery} from "../../services/articleService";
import {Link, Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../services/context/userLocal";
import {useAuth} from "../../hooks/useAuth";

// interface IArticleContainerProps {
//     articleList: IArticle[]
// }
export default function ArticleContainer() {
    const [page, setPage] = useState(0)
    const {token} = useAuth()
    const { data: articleData, isFetching, isError } = useFetchAllArticleQuery({token, page: page || 1} )
    const { isAuthLocal } = useAuth()

    // if (!isAuthLocal) {
    //     return <Redirect to="/"/>
    // }
    console.log(articleData)
    return (
        <>
            <ul className="article-container">
                {(isFetching && !articleData) && <Box sx={{ display: 'flex', mt: 3, justifyContent: 'center', position: 'absolute' }}>
                    <CircularProgress />
                </Box>}
                {articleData && articleData.articles.map(article => (
                    <li key={article.slug}>
                        <Article {...article}/>
                    </li>
                ))}
            </ul>
            {articleData &&
                <Pagination sx={{mx: 'auto', width: 'fit-content'}} count={Math.ceil(articleData.articlesCount / 5)}
                            page={page || 1} onChange={(_, num) => setPage(num)} shape="rounded" color="primary"
                            renderItem={item => <PaginationItem component={Link}
                                                                to={`/articles/?page=${item.page}`} {...item}/>}/>}
        </>


    );
}
