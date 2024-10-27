import React from "react";
import Article from "./Article.jsx";
import {Container, Row, Col, Card} from "react-bootstrap";

function Storage(props)
{
    return (
        <Container>
            <Card className="m-3">
                <Card.Header>
                    <Card.Title as="h1" className="text-center mt-2"> Saved articles </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        {props.savedArticles.map( (article_w_metadata, i) =>
                            <Col sm={12} md={6} lg={6} >
                                <Article
                                    inFeed={false}
                                    article={article_w_metadata["content"]}
                                    metadata={article_w_metadata["metadata"]}
                                    index={i}
                                    deleteArticle={props.deleteArticle} />
                            </Col> ) }
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Storage
