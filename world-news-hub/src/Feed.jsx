import React, { useState, useEffect } from "react"
import FeedArticles from "./FeedArticles.jsx"
import { Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

function Feed(props)
{

    // Initialize for debugging purposes (not to fetch all the time from the API)
    const [feedArticles, setFeedArticles] = useState( [] );
    const [loading, setLoading] = useState(true);

    // --- API calls functionality
    const news_token = import.meta.env.VITE_NEWS_TOKEN;

    const getData = async () => {
        try
        {
            const res = await fetch(`https://newsdata.io/api/1/latest?apikey=${news_token}&language=en`);
            const data = await res.json();

            // taking only necessary attributes from each entry
            const newArticles = data["results"].map( (item) => ({
                "title" : item["title"],
                "description" : item["description"],
                "image_url" : item["image_url"],
                "country" : item["country"],
                "source_name" : item["source_name"],
                "link" : item["link"]
            }));

            setFeedArticles(newArticles);
            setLoading(false);
            return true;
        }
        catch (e)
        {
            toastr.error("Failed to fetch the articles!")
            setFeedArticles([]);
            setLoading(false);
            return false;
        }
    }

    useEffect(()=> {
        getData();
    }, []);
    // ---

    const handleRefresh = async () => {
        setLoading(true);
        const status = await getData();
        if (status == true)
        {
            toastr.success("Successfully refreshed!");
        }
    }

    return (
        <Container className="text-center">
            {loading ? <Spinner animation="grow" size="xl" /> :
            <>
                <Row>
                    <Col>
                        <h1 className="m-2">Article feed</h1>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
                        <FeedArticles saveArticle={props.saveArticle} feedArticles={feedArticles}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="outline-dark" className="mb-3" onClick={handleRefresh}>Refresh the feed</Button>
                    </Col>
                </Row>
            </>}
        </Container>
    )
}

export default Feed
