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
            <Col className="text-center mt-4">
                <Card>
                    <Card.Header as="h1">Welcome to the World news hub!</Card.Header>
                    <Card.Body>
                        <Row className="mb-2">
                            <Col>
                                <Card.Title as="h2">About the application</Card.Title>
                                <Card.Text>
                                    The main idea of the application is to summarize news from across the world
                                    and give user the ability to perform searching and storing articles.
                                </Card.Text>
                            </Col>
                        </Row>
                        <Row style={{ textAlign: 'justify' }} className="m-2">
                            <Col sm={4} md={4} lg={{ span: 2, offset: 1 }}>
                                <Card.Subtitle as="h3">Scrolling the feed</Card.Subtitle>
                                <Card.Text>
                                    One option of using this app is to scroll the news from many well-known
                                    sources similar to scrolling on different social media. We also provide
                                    a functionality to store the articles for later use. For more specific
                                    searching, use the functionality provided by "Search" application.
                                </Card.Text>
                            </Col>
                            <Col sm={4} md={4} lg={{ span: 2, offset: 2 }}>
                                <Card.Subtitle as="h3">Searching functionality</Card.Subtitle>
                                <Card.Text>
                                    TODO
                                </Card.Text>
                            </Col>
                            <Col sm={4} md={4} lg={{ span: 2, offset: 2 }}>
                                <Card.Subtitle as="h3">Looking into saved articles</Card.Subtitle>
                                <Card.Text>
                                    When you previously saved the articles from feed that interested you,
                                    they will be shown in the "Storage" section. In case you are not interested
                                    in them anymore, you can simply delete it. Together with the article itself,
                                    we also track certain metadata such as date of saving and so on.
                                </Card.Text>
                            </Col>
                        </Row>
                        <Link to="/feed">
                            <Button variant="outline-dark" size="lg">Enter the app!</Button>
                        </Link>
                    </Card.Body>
                    <Card.Footer>
                        Where to contact me?
                        <Row className="mt-2">
                            <Col sm={12} md={4} lg={4} className="mt-2">
                            <a href="https://github.com/ejdam87/" target="_blank"><Image src={GithubIm} rounded className="image"/></a>
                            </Col>
                            <Col sm={12} md={4} lg={4} className="mt-2">
                                <a href="https://www.instagram.com/dzadam__/" target="_blank"><Image src={InstagramIm} rounded className="image"/></a>
                            </Col>
                            <Col sm={12} md={4} lg={4} className="mt-2">
                            <a href="mailto:adam.dzadon@gmail.com" target="_blank"><Image src={MailIm} rounded className="image"/></a>
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
