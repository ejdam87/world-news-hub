import React from "react"
import { Container, Card } from 'react-bootstrap';

import SearchForm from "./SearchForm";

function Search()
{
    return (
        <Container>
            <Card className="mt-3">
                <Card.Header>
                    <Card.Title as="h1" className="text-center">
                        Advanced searching
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <SearchForm />
                </Card.Body>
            </Card>
        </Container>
      );
}

export default Search
