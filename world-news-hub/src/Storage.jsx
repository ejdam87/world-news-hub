import React, {useState, useMemo} from "react";
import Article from "./Article.jsx";
import {Container, Row, Col, Card, Accordion, Dropdown, DropdownButton, Spinner} from "react-bootstrap";

import "./AccordionColors.css";

function Storage(props)
{

    const [groupAttribute, setGroupAttribute] = useState( "noGroup" );
    const [loading, setLoading] = useState(false);

    const groupArticles = () => {
        const groups = {};

        if (groupAttribute == "noGroup")
        {
            return {"Articles" : [...Array( props.savedArticles.length ).keys()]};
        }

        for (let i = 0; i < props.savedArticles.length; i++)
        {
            const article = props.savedArticles[i]["content"];
            
            let vals = article[groupAttribute];
            if (!Array.isArray(article[groupAttribute]))
            {
                vals = [ article[groupAttribute] ];
            }

            for (let val of vals)
            {
                if (!groups[val])
                {
                    groups[val] = [];
                }
                groups[val].push(i);
            }
        }

        if (Object.keys(groups).length == 0)
        {
            return {"Articles" : [...Array( props.savedArticles.length ).keys()]};
        }

        return groups;
    }

    const articleGroups = useMemo( () => {
        setLoading(true);
        const groups = groupArticles();
        setLoading(false);
        return groups;
    }, [props.savedArticles, groupAttribute]);

    return (
        <Container>
            <Card className="m-3">
                <Card.Header>
                    <Card.Title as="h1" className="text-center mt-2"> Saved articles </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col className="d-flex justify-content-center mb-3">
                            <DropdownButton variant="outline-dark" title="Group by" onSelect={(attr)=>{setGroupAttribute(attr)}}>
                                <Dropdown.Item eventKey="noGroup">No groups</Dropdown.Item>
                                {props.savedArticles.length == 0 ?
                                    <></>
                                    :
                                    <>
                                        <Dropdown.Item eventKey="country">Country</Dropdown.Item>
                                        <Dropdown.Item eventKey="category">Category</Dropdown.Item>
                                        <Dropdown.Item eventKey="language">Language</Dropdown.Item>
                                    </>
                                }
                            </DropdownButton>
                        </Col>
                    </Row>
                    {loading ?
                        <Row className="align-items-center">
                            <Col className="text-center">
                                <Spinner className="mt-3" animation="grow" size="xl" />
                            </Col>
                        </Row>
                        :
                        <Accordion>
                            {Object.keys(articleGroups).map( (group, i) =>
                                <Accordion.Item eventKey={i}>
                                    <Accordion.Header>{group}</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            {articleGroups[group].map( (j, k) =>
                                                <Col sm={12} md={6} lg={6} >
                                                    <Article
                                                        inFeed={false}
                                                        article={props.savedArticles[j]["content"]}
                                                        metadata={props.savedArticles[j]["metadata"]}
                                                        index={j}
                                                        deleteArticle={props.deleteArticle} />
                                                </Col>
                                            ) }
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                                ) }
                        </Accordion>}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Storage
