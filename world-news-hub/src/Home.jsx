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
            <Col sm={12} md={12} lg={12} className="text-center mt-4">
                <Card>
                    <h1>Welcome to the World news hub!</h1>
                    <Card.Body>
                        <Card.Title>About the application</Card.Title>
                        <Card.Text>
                            The main idea of the application is to summarize news from across the world
                            and give user the ability to perform searching and storing articles.
                        </Card.Text>
                        <Card.Subtitle>Scrolling the feed</Card.Subtitle>
                        <Card.Text>
                            One option of using this app is to scroll the news from many well-known
                            sources similar to scrolling on different social media. We also provide
                            a functionality to store the articles for later use.
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
