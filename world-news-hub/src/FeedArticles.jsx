import React from "react"
import { Carousel } from 'react-bootstrap';

import Article from "./Article.jsx";

function FeedArticles(props)
{
    return(
        <Carousel interval={null} variant="dark">
            {
                props.feedArticles.map((article, index) => (
                        <Carousel.Item key={index}>
                            <Article saveArticle={props.saveArticle} article={article} />
                        </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default FeedArticles
