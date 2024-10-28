import React from "react";
import { Link } from 'react-router-dom';
import {Card, Col, Row, Image, Container, Button, Accordion} from "react-bootstrap";

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
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Scrolling the feed</Accordion.Header>
                                    <Accordion.Body>
                                            One option of using this app is to scroll the news from many well-known
                                            sources similar to scrolling on different social media. We also provide
                                            a functionality to store the articles for later use. For more specific
                                            searching, use the functionality provided by "Search" application.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Searching functionality</Accordion.Header>
                                    <Accordion.Body>
                                        In case the basic feed articles are not enough, the application
                                        provides a functionality for more advanced searching based on keywords,
                                        language, country, and category. Again, the search results can be saved
                                        for later use.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Looking into saved articles</Accordion.Header>
                                    <Accordion.Body>
                                        When you previously saved the articles from feed that interested you,
                                        they will be shown in the "Storage" section. In case you are not interested
                                        in them anymore, you can simply delete it. Together with the article itself,
                                        we also track certain metadata such as date of saving and so on.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
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
