import React, { useState, useEffect } from "react"
import Articles from "./Articles.jsx"
import { Container, Button } from 'react-bootstrap';

function Feed()
{
    const [articles, setArticles] = useState( [{"title": "placeholder", "description": "bitch"},
                                               {"title": "placeholder2", "description": "bitch2"}] );

    // --- API calls functionality
    const news_token = import.meta.env.VITE_NEWS_TOKEN;

    const getData = async () => {
        try
        {
            //const res = await fetch(`https://newsdata.io/api/1/latest?apikey=${news_token}&language=en`);
            //const data = await res.json();
            //setArticles(data["results"]);
            console.log(articles);
        }
        catch (e)
        {
            setArticles( [{"country": "error", "category": "..."}] )
        }
    }

    useEffect(()=> {
        getData();
    }, []);
    // ---

    return (
        <Container className="text-center">
            <h1 className="m-2">Article feed</h1>
            <Articles articles={articles}/>
            <Button variant="outline-light" onClick={getData}>Refresh the feed</Button>
        </Container>
    )
}

export default Feed
