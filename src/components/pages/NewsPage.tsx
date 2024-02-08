import { useEffect, useState } from "react"
import { newsApiURL, newsApiKey } from "../../config/api/news"
import axios from 'axios'
import brokenImage from '../../assets/images/broken-image.gif'

export const NewsPage = () => {
    const [articles, setArticles] = useState([])
    const requestURL: string = newsApiURL + '?apiKey=' + newsApiKey


    useEffect(() => {
        axios.get(requestURL)
            .then((res) => {
                setArticles(res.data.results)
                console.log(res.data.results);
                
            })
            .catch((err) => console.log(err))
        
    }, [])

    return (
        <>
            <div className="articles-container">
                {articles.map((article:any) => {
                    return (
                        <div className="article-card" key={article.article_id}>
                            <img 
                                src={article.image_url ? article.image_url :brokenImage} 
                                alt={article.title} 
                            />
                            <h3>{article.title}</h3>
                            <p>{article.description ? article.description : 'No Description Available' }</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}