import React, { useState, useEffect } from "react"
import Articles from "./Articles.jsx"
import { Container, Button, Row, Col } from 'react-bootstrap';

function Feed()
{
    const [articles, setArticles] = useState( [{"title": "placeholder", "description": "bitch"},
                                               {"title": "placeholder2", "description": "bitch2"}] );

    // --- API calls functionality
    const news_token = import.meta.env.VITE_NEWS_TOKEN;

    const getData = async () => {
        try
        {
            //const res = await fetch(`https://newsdata.io/api/1/latest?apikey=${news_token}&language=en`);
            //const data = await res.json();
            //setArticles(data["results"]);
            console.log(articles);
        }
        catch (e)
        {
            setArticles( [{"country": "error", "category": "..."}] )
        }
    }

    useEffect(()=> {
        getData();
    }, []);
    // ---

    return (
        <Container className="text-center">
            
            <Row>
                <Col>
                    <h1 className="m-2">Article feed</h1>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col sm={12} md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <Articles articles={articles}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="outline-dark" onClick={getData}>Refresh the feed</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Feed
