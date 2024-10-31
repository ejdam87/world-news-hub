import React, {useState} from "react"
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import { useTranslation } from  "react-i18next";

import SearchForm from "./SearchForm";
import Article from "./Article";

function Search(props)
{
    const { t, i18n } = useTranslation();
    const [searchArticles, setSearchArticles] = useState( [] );
    const [loading, setLoading] = useState(false);

    return (
        <Container>
            <Card className="mt-3">
                <Card.Header>
                    <Card.Title as="h1" className="text-center">
                        {t("Advanced searching")}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <SearchForm fetchArticles={props.fetchArticles} setLoading={setLoading} setSearchArticles={setSearchArticles} />
                </Card.Body>
            </Card>
            {loading ?
                <Row className="align-items-center">
                    <Col className="text-center">
                        <Spinner className="mt-3" animation="grow" size="xl" />
                    </Col>
                </Row>
                :
                <>
                    <Card className="m-3">
                        <Card.Body>
                            <Row>
                                {searchArticles.map( (article, i) =>
                                    <Col sm={12} md={6} lg={6} key={i} >
                                        <Article
                                            inFeed={true}
                                            article={article}
                                            saveArticle={props.saveArticle}
                                            key={i} />
                                    </Col>
                                ) }
                            </Row>
                        </Card.Body>
                    </Card>
                </>
            }
        </Container>
      );
}

export default Search
