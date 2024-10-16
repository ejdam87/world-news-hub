import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import GithubIm from './images/github.png';
import InstagramIm from './images/instagram.png';
import MailIm from './images/mail.png';

import "./Home.css";

function Home()
{
    return (<>
    <Container className="vh-100">
        <Row className="align-items-center">
            <Col sm={12} md={12} lg={12} className="text-center">
                <h1>Welcome to the World news hub!</h1>
            </Col>
        </Row>

        <Row className="align-items-center">
            <Col sm={12} md={12} lg={12} className="text-center">
                <Card>
                    <Card.Body>
                        <Card.Title>About the application</Card.Title>
                        <Card.Text>
                            The main idea of the application is to summarize the news from across the world
                            and give user the ability to perform searching and storing articles.
                        </Card.Text>
                        <Card.Subtitle>Scrolling the feed</Card.Subtitle>
                        <Card.Text>
                            TODO
                        </Card.Text>
                        <Card.Subtitle>Searching functionality</Card.Subtitle>
                        <Card.Text>
                            TODO
                        </Card.Text>
                        <Card.Subtitle>Looking into saved articles</Card.Subtitle>
                        <Card.Text>
                            TODO
                        </Card.Text>
                        <Link to="/feed">
                            <Button variant="primary" size="lg">Enter the app!</Button>
                        </Link>
                    </Card.Body>
                    <Card.Footer>
                        Where to contact me?
                        <Row>
                            <Col sm={12} md={4} lg={4}>
                                <Image src={GithubIm} rounded className="image"/>
                            </Col>
                            <Col sm={12} md={4} lg={4}>
                                <Image src={InstagramIm} rounded className="image"/>
                            </Col>
                            <Col sm={12} md={4} lg={4}>
                                <Image src={MailIm} rounded className="image"/>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>
    </>
    )
}

export default Home
