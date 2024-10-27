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

    const jsonbin_token = import.meta.env.VITE_JSONBIN_TOKEN;
    const BIN_ID = "6717ae94e41b4d34e446f913";

    const getSavedArticles = async () => {
        try
        {
            const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                method: 'GET',
                headers: {
                    'X-Access-Key': jsonbin_token
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
                'X-Access-Key': jsonbin_token
                },
                body: JSON.stringify({ saved_articles: articles })
            });
            if (res.ok)
            {
                setSavedArticles(articles);
            }
        }
        catch(e)
        {
            console.error(e);
        }
      }

    const saveArticle = (article_w_metadata) => {
        saveArticles( [article_w_metadata, ...savedArticles] );
    }

    const deleteArticle = (i_to_remove) => {
        const newArticles = savedArticles.filter( (_, i) => i != i_to_remove );
        saveArticles(newArticles);
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
                  <Route path="/feed" element={<Feed saveArticle={saveArticle} />} />
                  <Route path="/search" element={<Search saveArticle={saveArticle} />} />
                  <Route path="/storage" element={<Storage deleteArticle={deleteArticle} savedArticles={savedArticles} />} />
            </Routes>
        </Router>
  )
}

export default App
