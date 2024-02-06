import { useEffect, useState } from "react"
import { topHeadlinesURL, newsApiKey } from "../../config/api/news"
import axios from 'axios'


export const NewsPage = () => {
    const [articles, setArticles] = useState([])
    const requestURL: string = topHeadlinesURL + '?country=us' + '&apiKey=' + newsApiKey


    useEffect(() => {
        axios.get(requestURL)
            .then((res) => {
                setArticles(res.data.articles)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div>
                {articles.map((article) => {
                    return <div key={article.title}>{article.author}</div>
                })}
            </div>
        </>
    )
}