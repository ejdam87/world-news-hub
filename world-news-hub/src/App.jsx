import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, ToggleButton, ButtonGroup } from "react-bootstrap";
import { useTranslation } from  "react-i18next";
import { changeLanguage } from "i18next";

import './litera.bootstrap.min.css';

import Home from "./Home.jsx";
import Search from "./Search.jsx";
import Feed from "./Feed.jsx";
import Storage from "./Storage.jsx";

function App() {

    const { t, i18n } = useTranslation();
    const [savedArticles, setSavedArticles] = useState( [] );
    const [selectedlang, setSelectedLang] = useState("en");

    const langs = [
        { name: 'English', value: 'en' },
        { name: 'Spanish', value: 'es' }
    ];

    const JSONBIN_TOKEN = import.meta.env.VITE_JSONBIN_TOKEN;
    const HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;
    const NEWS_TOKEN = import.meta.env.VITE_NEWS_TOKEN;
    const BIN_ID = "6717ae94e41b4d34e446f913";

    const fetchSentiment = async (text) => {

        try
        {
            const data = {"inputs": text};
            const response = await fetch(
                "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment",
                {
                    headers: {
                        "Authorization": `Bearer ${HUGGINGFACE_TOKEN}`,
                        "Content-Type" : "application/json",
                        "x-wait-for-model": "true"
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            
            if (!response.ok)
            {
                return "Unavailable";
            }

            let result = await response.json();
            result = result[0];

            let mx = result[0];
            for (let i = 1; i < result.length; i++) {
                if (result[i]["score"] > mx["score"]) {
                    mx = result[i];
                }
            }

            if (mx["label"] == "LABEL_0")
            {
                return "Mostly negative";
            }
            else if (mx["label"] == "LABEL_1")
            {
                return "Mostly neutral";
            }
            else
            {
                return "Mostly positive";
            }
        }
        catch (e)
        {
            return "Unavailable";
        }
    }

    const fetchArticles = async (q) => {
        try
        {
            const res = await fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_TOKEN}&${q}`);

            if (!res.ok)
            {
                return [];
            }

            const data = await res.json();
    
            const sentiments = [];
            for (let i = 0; i < data["results"].length; i++)
            {
                const sent = await fetchSentiment( data["results"][i]["title"] );
                sentiments.push( sent );
            }
    
            const newArticles = data["results"].map( (item, i) => ({
                "title" : item["title"],
                "description" : item["description"],
                "image_url" : item["image_url"],
                "country" : item["country"],
                "category": item["category"],
                "language": item["language"],
                "source_name" : item["source_name"],
                "link" : item["link"],
                "sentiment" : sentiments[i]
            }));
    
            return newArticles;
        }
        catch (e)
        {
            return [];
        }
    }

    const getSavedArticles = async () => {
        try
        {
            const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                method: 'GET',
                headers: {
                    'X-Access-Key': JSONBIN_TOKEN
                }
            });
            
            if (!res.ok)
            {
                return false;
            }

            const json = await res.json();
            setSavedArticles(json.record.saved_articles);
            return true;
        }
        catch (e)
        {
            setSavedArticles([]);
            return false;
        }
    }

    useEffect(()=> {
        getSavedArticles();
    }, []);

    const saveArticles = async (articles) => {
        try {
            const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'X-Access-Key': JSONBIN_TOKEN
                },
                body: JSON.stringify({ saved_articles: articles })
            });

            if (!res.ok)
            {
                return false;
            }

            setSavedArticles(articles);
            return true;
        }
        catch(e)
        {
            return false;
        }
      }

    const saveArticle = async (article_w_metadata) => {
        const res = await saveArticles( [article_w_metadata, ...savedArticles] );
        return res;
    }

    const deleteArticle = async (i_to_remove) => {
        const newArticles = savedArticles.filter( (_, i) => i != i_to_remove );
        const res = await saveArticles(newArticles);
        return res;
    }

    return (<Router>
                <Navbar expand="md" className="navbar navbar-expand-lg bg-body-tertiary">
                    <Container>
                        <Navbar.Brand as={Link} to="/">{t("World news hub")}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">{t("Home")}</Nav.Link>
                                <Nav.Link as={Link} to="/feed">{t("Feed")}</Nav.Link>
                                <Nav.Link as={Link} to="/search">{t("Search")}</Nav.Link>
                                <Nav.Link as={Link} to="/Storage">{t("Storage")}</Nav.Link>
                            </Nav>
                            <ButtonGroup>
                                {langs.map((lang, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        variant={"outline-dark"}
                                        name="radio"
                                        value={lang.value}
                                        checked={selectedlang === lang.value}
                                        onChange={(e) => {changeLanguage(e.currentTarget.value); setSelectedLang(e.currentTarget.value);}}
                                    >
                                        {t(lang.name)}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/feed" element={<Feed fetchArticles={fetchArticles} saveArticle={saveArticle} />} />
                    <Route path="/search" element={<Search fetchArticles={fetchArticles} saveArticle={saveArticle} />} />
                    <Route path="/storage" element={<Storage deleteArticle={deleteArticle} savedArticles={savedArticles} />} />
                </Routes>
            </Router>
  )
}

export default App
