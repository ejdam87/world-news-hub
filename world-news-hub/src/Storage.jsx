import React from "react"

function Storage(props)
{
    return (
        <>
            { props.savedArticles.map( (article) => <p>{article.title}</p> ) }
        </>
    )
}

export default Storage
