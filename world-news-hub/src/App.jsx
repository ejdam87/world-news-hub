import React, {useState, useEffect} from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './litera.bootstrap.min.css';

import Home from "./Home.jsx";
import Search from "./Search.jsx";
import Feed from "./Feed.jsx";
import Storage from "./Storage.jsx";

function App() {

    const [savedArticles, setSavedArticles] = useState( [] );

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
            console.log(e);
            return "Unavailable";
        }
    }

    const fetchArticles = async (q) => {
        const res = await fetch(`https://newsdata.io/api/1/latest?apikey=${NEWS_TOKEN}&${q}`);
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

    const getSavedArticles = async () => {
        try
        {
            const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                method: 'GET',
                headers: {
                    'X-Access-Key': JSONBIN_TOKEN
                }
            });

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
            if (res.ok)
            {
                setSavedArticles(articles);
                return true;
            }
            else
            {
                return false;
            }
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
          <Navbar className="navbar navbar-expand-lg bg-body-tertiary">
            <Container>
              <Navbar.Brand as={Link} to="/">World news hub</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
                <Nav.Link as={Link} to="/search">Search</Nav.Link>
                <Nav.Link as={Link} to="/Storage">Storage</Nav.Link>
              </Nav>
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
