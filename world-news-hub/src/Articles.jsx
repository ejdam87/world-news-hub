import React, { useEffect } from "react"

function Articles()
{
    const news_token = import.meta.env.VITE_NEWS_TOKEN;

    const getData = async () => {
        const res = await fetch("https://myproducts.com/");
        const data = await res.json();
        console.log(data);
    }

    useEffect(()=> {
        getData();
    }, []);

    return <div>Articles</div>
}

export default Articles
