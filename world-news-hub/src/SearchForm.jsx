import React, {useState} from "react"
import { Form, Row, Col, Button } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import { useTranslation } from  "react-i18next";

import "./SearchForm.css";

function SearchForm(props)
{
    const { t, i18n } = useTranslation();

    const LANG_MAP = {"English" : "en", "Dutch" : "nl", "Chinese" : "zh", "French" : "fr",
                      "Finnish": "fi", "German": "de", "Japanese": "jp", "Spanish" : "es"};
    
    const LANGS = Object.keys(LANG_MAP).map( (l) => { return {"name": l, "val": LANG_MAP[l]} } );

    const COUNTRY_MAP = {"Australia" : "au", "Brazil" : "br", "Canada" : "ca",
                         "China" : "cn", "Finland" : "fi", "France" : "fr", "Germany" : "de",
                         "Japan" : "jp", "Netherlands" : "nl", "Spain" : "es",
                         "United States of America" : "us", "United Kingdom" : "uk", "World" : "wo"};

    const COUNTRIES = Object.keys(COUNTRY_MAP).map( (c) => { return {"name": c, "val": COUNTRY_MAP[c]} } );

    const CATEGORY_MAP = {"Business": "business", "Crime": "crime", "Education": "education", "Food": "food",
                          "Health": "health", "Politics": "politics", "Sports": "sports", "Science": "science",
                          "Technology": "technology", "Top": "top", "Tourism": "tourism"}

    const CATEGORIES = Object.keys(CATEGORY_MAP).map( (c) => { return {"name": c, "val": CATEGORY_MAP[c]} } );

    const [queryString, setQueryString] = useState("");
    const [selectedLangs, setSelectedLangs] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const qWords = queryString.split(" ").filter( (w) => w != "" );
        const qWordQuery = qWords.length == 0 ? "": "q=" + qWords.join("%20");
        setQueryString("");

        const slangs = selectedLangs.map( (l) => l["val"] );
        const languageQuery = slangs.length == 0 ? "" : "language=" + slangs.join(",");

        const scountries = selectedCountries.map( (c) => c["val"] )
        const countryQuery = scountries.length == 0 ? "" : "country=" + scountries.join(",");

        const scategories = selectedCategories.map( (c) => c["val"] )
        const categoryQuery = scategories.length == 0 ? "" : "category=" + scategories.join(",");

        const query = [ qWordQuery, languageQuery, countryQuery, categoryQuery ].filter( (q) => q != "" ).join("&");

        try
        {
            const newArticles = await props.fetchArticles(query);
            props.setSearchArticles(newArticles);
            props.setLoading(false);
            return true;
        }
        catch (e)
        {
            console.log(e);
            props.setLoading(false);
            return false;
        }
    }

    const handleSubmitClick = async (e) => {
        props.setLoading(true);
        const status = await handleSubmit(e);
        if (status == true)
        {
            toastr.success(t("Found articles!"));
        }
        else
        {
            toastr.error(t("Failed to fetch the articles!"));
        }
    }

    return (
        <Form onSubmit={handleSubmitClick}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>{t("Search query")}</Form.Label>
                        <Form.Control
                            onChange={(e) => setQueryString(e.target.value)}
                            value={queryString}
                            type="text"
                            placeholder={t("Enter a sequence of keywords separated by space")} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={4} lg={4}>
                    <Form.Group>
                        <Form.Label>{t("Country")}</Form.Label>
                        <Multiselect
                            options={COUNTRIES.map( (entry) => { return {"name": t(entry["name"]), "val": entry["val"]} } )}
                            displayValue="name"
                            placeholder={t("Select countries")}
                            showArrow={true}
                            onSelect={ (sl, _) => { setSelectedCountries( sl ) } }
                            onRemove={ (sl, _) => { setSelectedCountries( sl ) } }
                        />
                    </Form.Group>
                </Col>

                <Col sm={12} md={4} lg={4}>
                    <Form.Group>
                        <Form.Label>{t("Category")}</Form.Label>
                        <Multiselect
                            options={CATEGORIES.map( (entry) => { return {"name": t(entry["name"]), "val": entry["val"]} } )}
                            displayValue="name"
                            placeholder={t("Select categories")}
                            showArrow={true}
                            onSelect={ (sl, _) => { setSelectedCategories( sl ) } }
                            onRemove={ (sl, _) => { setSelectedCategories( sl ) } }
                        />
                    </Form.Group>
                </Col>

                <Col sm={12} md={4} lg={4}>
                <Form.Group>
                    <Form.Label>{t("Language")}</Form.Label>
                    <Multiselect
                        options={LANGS.map( (entry) => { return {"name": t(entry["name"]), "val": entry["val"]} } )}
                        displayValue="name"
                        placeholder={t("Select languages")}
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
                        {t("Search")}
                    </Button>
                </Col>
            </Row>
        </Form>
      );
}

export default SearchForm
