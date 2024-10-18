import React from "react"
import { Carousel } from 'react-bootstrap';

import Article from "./Article.jsx";

function Articles(props)
{
    return(
        <Carousel interval={null}>
            {
                props.articles.map((article, index) => (
                        <Carousel.Item key={index}>
                            <Article headline={article["title"]} text={article["description"]} />
                        </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default Articles
