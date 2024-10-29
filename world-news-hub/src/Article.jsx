import React from "react"
import { Card, Button } from 'react-bootstrap';

import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

import NewsIm from "./images/news.webp";
import "./Article.css";

function Article(props)
{
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleSave = async () => {

        const timeOfSaving = new Date().toLocaleString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          });

        const cargo = { "content" : props.article, "metadata": {"time" : timeOfSaving} };
        const res = await props.saveArticle( cargo );
        if (res == true)
        {
            toastr.success("Article successfully saved!");
        }
        else
        {
            toastr.error("Article saving failed!");
        }
    }

    const handleDelete = async () => {
        const res = await props.deleteArticle( props.index );
        if (res == true)
        {
            toastr.success("Article successfully deleted!");
        }
        else
        {
            toastr.error("Article deletion failed!");
        }
    }

    return( <Card className="text-center m-3">
                <Card.Header as="h5">
                    {
                    props.inFeed ? 
                    <Button variant="outline-dark" onClick={handleSave}>Save the article</Button>
                    :
                    <Button variant="outline-dark" onClick={handleDelete}>Delete the article</Button>
                    }
                </Card.Header>
                {props.inFeed ? <></> : <Card.Text className="mt-1"> Saved at: {props.metadata["time"]} </Card.Text>}
                <Card.Text className="mt-2"> Sentiment : {props.article["sentiment"]} </Card.Text>
                <Card.Img
                    className="article-image"
                    variant="top"
                    src={props.article["image_url"] == null ? NewsIm : props.article["image_url"]}
                    onError={(e) => e.target.src = NewsIm}/>
                <Card.Body>
                    <Card.Title>{props.article["title"]}</Card.Title>
                    <Card.Text>{props.article["description"]}</Card.Text>
                    <Card.Text> {props.article["country"].map( (c) => capitalize(c) ).join(",")} | {props.article["source_name"]} | <Card.Link target="_blank" href={props.article["link"]}>Full article here</Card.Link> </Card.Text>
                </Card.Body>
            </Card>
            )
}

export default Article
