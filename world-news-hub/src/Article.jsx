import React from "react"
import { Card, Button, Container, Image } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Article(props)
{
    return(<Container>
                <Card className="text-center m-3" >
                    <Card.Body>
                        <Row>
                            <Col md={5}>
                                <Image src="https://placehold.co/500x100" />
                            </Col>
                            <Col md={7} className="d-flex flex-column">
                                <Card.Header as="h5">{props.headline}</Card.Header>
                                <Card.Text>{props.text}</Card.Text>
                                <Card.Footer>
                                    <Button variant="primary">Save the article</Button>
                                </Card.Footer>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            )
}

export default Article
