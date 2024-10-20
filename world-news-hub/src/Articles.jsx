import React from "react"
import { Carousel } from 'react-bootstrap';

import Article from "./Article.jsx";

function Articles(props)
{
    return(
        <Carousel interval={null} variant="dark">
            {
                props.articles.map((article, index) => (
                        <Carousel.Item key={index}>
                            <Article
                                title={article["title"]}
                                desc={article["description"]}
                                image_url={article["image_url"]}
                                country={article["country"]}
                                source_name={article["source_name"]}
                                link={article["link"]}
                                />
                        </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default Articles
