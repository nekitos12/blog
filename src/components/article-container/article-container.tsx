import React, {useState} from 'react';
import './article-container.scss';
import {IArticle} from "../../types/article";
import Article from "../article";
import {CircularProgress, Pagination, PaginationItem, Box} from "@mui/material";
import {useFetchAllArticleQuery} from "../../services/articleService";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/useTypedSelector";

// interface IArticleContainerProps {
//     articleList: IArticle[]
// }
export default function ArticleContainer({defPage = ''}) {
    const [page, setPage] = useState(1)
    const { data: articleData, isFetching, isError } = useFetchAllArticleQuery(Number(defPage || page))
    console.log(isFetching)
    return (
        <>
            <ul className="article-container">
                {isFetching && <Box sx={{ display: 'flex', mt: 3, justifyContent: 'center' }}>
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
                            page={Number(defPage || page)} onChange={(_, num) => setPage(num)} shape="rounded" color="primary"
                            renderItem={item => <PaginationItem component={Link}
                                                                to={`/articles/?page=${item.page}`} {...item}/>}/>}
        </>


    );
}
