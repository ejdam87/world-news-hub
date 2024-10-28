import React, {useState} from "react";
import Article from "./Article.jsx";
import {Container, Row, Col, Card, Accordion, Dropdown, DropdownButton} from "react-bootstrap";

function Storage(props)
{

    const [articleGroups, setArticleGroups] = useState( {"Articles": props.savedArticles} );

    const groupBy = (attr) => {
            const groups = {};

            if (attr == "noGroup")
            {
                setArticleGroups({"Articles" : props.savedArticles});
                return;
            }

            for (let obj of props.savedArticles)
            {
                const article = obj["content"];

                if (!groups[article[attr]])
                {
                    groups[article[attr]] = [];
                }
                groups[article[attr]].push( obj );
            }

            setArticleGroups(groups);
        }

    const deleteArticleStorage = async (index) =>
    {
        const group = index[0];
        const i = index[1];

        articleGroups[group].splice( i, 1 );
        setArticleGroups(articleGroups);

        const res = await props.deleteArticle( props.savedArticles.indexOf(articleGroups[group][i]) );
        return res;
    }

    return (
        <Container>
            <Card className="m-3">
                <Card.Header>
                    <Card.Title as="h1" className="text-center mt-2"> Saved articles </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <DropdownButton variant="outline-dark" title="Group by" onSelect={(attr)=>groupBy(attr)}>
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
                    <Accordion>
                        {Object.keys(articleGroups).map( (group, i) =>
                            <Accordion.Item eventKey={i}>
                                <Accordion.Header>{group}</Accordion.Header>
                                <Accordion.Body>
                                    {articleGroups[group].map( (article_w_metadata, j) =>
                                        <Article
                                            inFeed={false}
                                            article={article_w_metadata["content"]}
                                            metadata={article_w_metadata["metadata"]}
                                            index={[group, j]}
                                            deleteArticleStorage={deleteArticleStorage} />) }
                                </Accordion.Body>
                            </Accordion.Item>
                            ) }
                    </Accordion>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Storage
