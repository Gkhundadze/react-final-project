import { useEffect, useState } from "react"
import { newsApiURL, newsApiKey } from "../../../config/api/news"
import axios from 'axios'
import ReactLoading from "react-loading"
import { ErrorMessage } from "../../shared/other/ErrorMessage"
import { NewsArticle } from "./NewsArticle"


export const NewsPage = () => {
    const requestURL: string = newsApiURL + '?apiKey=' + newsApiKey
    const [articles, setArticles] = useState([])
    const [renderArticles, setRenderArticles] = useState([])
    const [apiErrorMsg, setApiErrorMsg] = useState('')
    const [ searchValue, setSearchValue] = useState('')
    const [firstLoad, setFirstLoad] = useState(true)

    const filterArticles:any = (keyword:string) => {
        setFirstLoad(false)
        const tempData = [...articles]
        const filteredData = tempData.filter((data:any) => {
            return data.title.toLowerCase().includes(keyword.toLowerCase())
        })
        return filteredData
    }


    const handleSearch = (e:any) => {
        const inputValue:string = e.target.value
        setSearchValue(inputValue)

        const filtered = filterArticles(inputValue)
        setRenderArticles(filtered)
    }
    useEffect(() => {
        axios.get(requestURL)
            .then((res) => {
                setArticles(res.data.results)
                setRenderArticles(res.data.results)
            })
            .catch((err) => {
                setApiErrorMsg(err.response.data.results.message)                
            })
            
    }, [])

    return (
        <>
            <div className="search-container">
                <input 
                onInput={handleSearch} 
                type="search" 
                name="article-search" 
                value={searchValue}  
                placeholder="Search fo article"
                />
            </div>
            <div className="articles-container">
                {renderArticles.length > 0 // if data received
                ?
                renderArticles.map((article:any) => {
                    return (
                        <NewsArticle key={article.article_id} article={article} />
                    )
                })
                : renderArticles.length === 0 && !apiErrorMsg // if no data and no error from api
                ? 
                    firstLoad   ? <ReactLoading type={'balls'} color={'#2D9596'} height={667} width={375} />
                                :
                                <h5>no such article</h5>
                : renderArticles.length === 0 && apiErrorMsg // if no data and error message comes from api
                ?
                    <ErrorMessage message={apiErrorMsg} />
                :
                 null
                }
            </div>
        </>
    )
}