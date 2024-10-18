import React from "react"
import { Card, Button, Row, Col } from 'react-bootstrap';

function Article(props)
{
    return( <Card className="text-center m-3">
                <Card.Header as="h5">
                    <Button variant="primary">Save the article</Button>
                </Card.Header>
                <Row>
                    <Col md={5}>
                        <Card.Img variant="bottom" src="https://placehold.co/100x80"/>
                    </Col>
                    <Col md={7}>
                        <Card.Body>
                            <Card.Title>{props.headline}</Card.Title>
                            <Card.Text>{props.text}</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            )
}

export default Article
