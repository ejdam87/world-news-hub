import React, {useState} from "react"
import { Form, Row, Col, Button } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';

import "./SearchForm.css";

function SearchForm()
{

    const languages = ['english', 'french'];
    const countries = ['brazil', 'spain'];
    const categories = ['top', 'sport'];

    const [queryString, setQueryString] = useState("");
    const [selectedLangs, setSelectedLangs] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( "Key words:" );
        console.log( queryString );

        console.log( "selected langs:" );
        console.log( selectedLangs );

        console.log( "selected countries:" );
        console.log( selectedCountries );

        console.log( "selected categories:" );
        console.log( selectedCategories);

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Search query</Form.Label>
                        <Form.Control
                            onChange={(e) => setQueryString(e.target.value)}
                            type="text"
                            placeholder="Enter a sequence of keywords separated by space" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={4} lg={4}>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Multiselect
                            isObject={false}
                            options={countries}
                            placeholder="Select countries"
                            showArrow={true}
                            onSelect={ (sl, _) => { setSelectedCountries( sl ) } }
                            onRemove={ (sl, _) => { setSelectedCountries( sl ) } }
                        />
                    </Form.Group>
                </Col>

                <Col sm={12} md={4} lg={4}>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Multiselect
                            isObject={false}
                            options={categories}
                            placeholder="Select categories"
                            showArrow={true}
                            onSelect={ (sl, _) => { setSelectedCategories( sl ) } }
                            onRemove={ (sl, _) => { setSelectedCategories( sl ) } }
                        />
                    </Form.Group>
                </Col>

                <Col sm={12} md={4} lg={4}>
                <Form.Group>
                    <Form.Label>Language</Form.Label>
                    <Multiselect
                        isObject={false}
                        options={languages}
                        placeholder="Select languages"
                        showArrow={true}
                        onSelect={ (sl, _) => { setSelectedLangs( sl ) } }
                        onRemove={ (sl, _) => { setSelectedLangs( sl ) } }
                    />
                </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col className="text-center">
                    <Button className="mt-3" variant="outline-dark" size="lg" type="submit">
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
      );
}

export default SearchForm
