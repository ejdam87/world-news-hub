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
        // do whatever is necessary to save the article
        toastr.success("Article successfully saved!");
    }

    return( <Card className="text-center m-3">
                <Card.Header as="h5">
                    <Button variant="outline-dark" onClick={handleSave}>Save the article</Button>
                </Card.Header>
                <Card.Img
                    className="article-image"
                    variant="top"
                    src={props.image_url == null ? NewsIm : props.image_url}/>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.desc}</Card.Text>
                    <Card.Text> {capitalize(props.country)} | {props.source_name} | <Card.Link target="_blank" href={props.link}>Full article here</Card.Link> </Card.Text>
                </Card.Body>
            </Card>
            )
}

export default Article
