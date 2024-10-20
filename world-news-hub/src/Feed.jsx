import React, { useState, useEffect } from "react"
import Articles from "./Articles.jsx"
import { Container, Button, Row, Col } from 'react-bootstrap';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

function Feed()
{

    // Initialize for debugging purposes (not to fetch all the time from the API)
    const [articles, setArticles] = useState( [{"title": "placeholder",
                                                "description": "desc",
                                                "image_url": "https://placehold.co/100x80",
                                                "country": "Slovakia",
                                                "source_name": "Dzadam",
                                                "link": "lol"},
                                               {"title": "placeholder2",
                                                "description": "desc2",
                                                "image_url": "https://placehold.co/100x80",
                                                "country": "Czechia",
                                                "source_name": "Dzadam",
                                                "link": "lol"}] );

    // --- API calls functionality
    const news_token = import.meta.env.VITE_NEWS_TOKEN;

    const getData = async () => {
        try
        {
            const res = await fetch(`https://newsdata.io/api/1/latest?apikey=${news_token}&language=en`);
            const data = await res.json();
            setArticles(data["results"]);
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

    const handleRefresh = () => {
        getData();
        toastr.success("Successfully refreshed!");
    }

    return (
        <Container className="text-center">
            
            <Row>
                <Col>
                    <h1 className="m-2">Article feed</h1>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
                    <Articles articles={articles}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="outline-dark" className="mb-3" onClick={handleRefresh}>Refresh the feed</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Feed
