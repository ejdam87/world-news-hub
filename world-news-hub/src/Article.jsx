import React from "react"
import { Card, Button } from 'react-bootstrap';

import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

import NewsIm from "./images/news.webp";
import "./Article.css";

function Article(props)
{
    const capitalize = (s) => {
        const string = s[0]; // props.attr is a list
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleSave = () => {
        props.saveArticle( props.article );
        toastr.success("Article successfully saved!");
    }

    return( <Card className="text-center m-3">
                <Card.Header as="h5">
                    <Button variant="outline-dark" onClick={handleSave}>Save the article</Button>
                </Card.Header>
                <Card.Img
                    className="article-image"
                    variant="top"
                    src={props.article["image_url"] == null ? NewsIm : props.article["image_url"]}/>
                <Card.Body>
                    <Card.Title>{props.article["title"]}</Card.Title>
                    <Card.Text>{props.article["description"]}</Card.Text>
                    <Card.Text> {capitalize(props.article["country"])} | {props.article["source_name"]} | <Card.Link target="_blank" href={props.article["link"]}>Full article here</Card.Link> </Card.Text>
                </Card.Body>
            </Card>
            )
}

export default Article
