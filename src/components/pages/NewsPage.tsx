import { useEffect, useState } from "react"
import { newsApiURL, newsApiKey } from "../../config/api/news"
import axios from 'axios'
import brokenImage from '../../assets/images/broken-image.gif'
import ReactLoading from "react-loading"
import { ErrorMessage } from "../shared/other/ErrorMessage"

export const NewsPage = () => {
    const requestURL: string = newsApiURL + '?apiKey=' + newsApiKey
    const [articles, setArticles] = useState([])
    const [apiErrorMsg, setApiErrorMsg] = useState('')


    useEffect(() => {
        axios.get(requestURL)
            .then((res) => {
                setArticles(res.data.results)
                // console.log(res.data.results);
                
            })
            .catch((err) => {
                setApiErrorMsg(err.response.data.results.message)                
            })
            
    }, [])

    return (
        <>
            <div className="articles-container">
                {articles.length > 0 // if data received
                ?
                articles.map((article:any) => {
                    return (
                        <div className="article-card" key={article.article_id}>
                            <img 
                                src={article.image_url ? article.image_url : brokenImage} 
                                alt={article.title} 
                            />
                            <h3>{article.title}</h3>
                            <p>{article.description ? article.description : 'No Description Available' }</p>
                        </div>
                    )
                })
                : articles.length === 0 && !apiErrorMsg // if no data and no error from api
                ? 
                    <ReactLoading type={'balls'} color={'#2D9596'} height={667} width={375} />
                : articles.length === 0 && apiErrorMsg // if no data and error message comes from api
                ?
                    <ErrorMessage message={apiErrorMsg} />
                :
                 null
                }
            </div>
        </>
    )
}