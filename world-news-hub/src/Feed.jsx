import React, { useState, useEffect } from "react"
import FeedArticles from "./FeedArticles.jsx"
import { Container, Button, Row, Col, Spinner } from 'react-bootstrap';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

function Feed(props)
{

    const [feedArticles, setFeedArticles] = useState( [] );
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        const newArticles = await props.fetchArticles("language=en");
        if (newArticles == [])
        {
            toastr.error("Failed to fetch the articles!");
            return false;
        }
        else
        {
            setFeedArticles(newArticles);
            toastr.success("Successfully fetched!");
        }

        setLoading(false);
        return true;
    }

    useEffect(()=> {
        getData();
    }, []);

    return (
        <Container className="text-center">
            <Row>
                <Col>
                    <h1 className="m-2">Article feed</h1>
                </Col>
            </Row>
            {loading ?
            <Row className="align-items-center">
                <Col className="text-center">
                    <Spinner className="mt-3" animation="grow" size="xl" />
                </Col>
            </Row>
            :
            <>
                <Row className="mb-4">
                    <Col sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }}>
                        <FeedArticles saveArticle={props.saveArticle} feedArticles={feedArticles}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="outline-dark" className="mb-3" onClick={getData}>Refresh the feed</Button>
                    </Col>
                </Row>
            </>}
        </Container>
    )
}

export default Feed
