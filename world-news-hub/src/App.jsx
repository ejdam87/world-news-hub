import React from 'react'
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

  return (<Router>
          <Navbar bg="dark" data-bs-theme="dark">
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
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/storage" element={<Storage />} />
            </Routes>
        </Router>
  )
}

export default App
