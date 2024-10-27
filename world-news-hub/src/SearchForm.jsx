import React, {useState} from "react"
import { Form, Row, Col, Button } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

import "./SearchForm.css";

function SearchForm(props)
{
    const LANG_MAP = {"English" : "en", "Dutch" : "nl", "Chinese" : "zl", "French" : "fr",
                      "Finnish": "fi", "German": "de", "Japanese": "jp", "Spanish" : "es"};
    
    const COUNTRY_MAP = {"Australia" : "au", "Brazil" : "br", "Canada" : "ca",
                         "China" : "cn", "Finland" : "fi", "France" : "fr", "Germany" : "de",
                         "Japan" : "jp", "Netherlands" : "nl", "Spain" : "es",
                         "United States of America" : "us", "United Kingdom" : "uk", "World" : "wo"};

    const LANGS = Object.keys(LANG_MAP);
    const COUNTRIES = Object.keys(COUNTRY_MAP);

    const CATEGORIES = ["Business", "Crime", "Education", "Food", "Health",
                        "Politics", "Sports", "Science", "Technology", "Top", "Tourism"];

    const [queryString, setQueryString] = useState("");
    const [selectedLangs, setSelectedLangs] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const NEWS_TOKEN = import.meta.env.VITE_NEWS_TOKEN;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const qWords = queryString.split(" ").filter( (w) => w != "" );
        const qWordQuery = qWords.length == 0 ? "": "q=" + qWords.join("%20");

        const slangs = selectedLangs.map( (l) => LANG_MAP[l] );
        const languageQuery = slangs.length == 0 ? "" : "language=" + slangs.join(",");

        const scountries = selectedCountries.map( (c) => COUNTRY_MAP[c] )
        const countryQuery = scountries.length == 0 ? "" : "country=" + scountries.join(",");

        const scategories = selectedCategories.map( (c) => c.charAt(0).toLowerCase() + c.slice(1) )
        const categoryQuery = scategories.length == 0 ? "" : "category=" + scategories.join(",");

        const query = [ qWordQuery, languageQuery, countryQuery, categoryQuery ].filter( (q) => q != "" ).join("&");

        try
        {
            const res = await fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_TOKEN}&${query}`);
            const data = await res.json();

            const newArticles = data["results"].map( (item) => ({
                "title" : item["title"],
                "description" : item["description"],
                "image_url" : item["image_url"],
                "country" : item["country"],
                "source_name" : item["source_name"],
                "link" : item["link"]
            }));

            props.setSearchArticles(newArticles);
            props.setLoading(false);
            return true;
        }
        catch (e)
        {
            toastr.error("Failed to fetch the articles!");
            props.setLoading(false);
            return false;
        }
    }

    const handleSubmitClick = async (e) => {
        props.setLoading(true);
        const status = await handleSubmit(e);
        if (status == true)
        {
            toastr.success("Found articles!");
        }
    }

    return (
        <Form onSubmit={handleSubmitClick}>
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
                            options={COUNTRIES}
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
                            options={CATEGORIES}
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
                        options={LANGS}
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
