import { useEffect, useState } from "react"
import axios from 'axios'
import { RandomRecipeURL, foodApiKey, suggestionsUrl } from "../../config/api/food"


export const FoodPage = () => {
const [searchKeyword, setSearchKeyword] = useState('')
const [req, setReq] = useState('')
const [recipes, setRecipes] = useState([])
const [baseURL, setBaseURL] = useState('')
const [suggestions, setSuggestions] = useState([])
const [recipeMessage, setRecipeMessage] = useState('')

const handleSearch = (event:any) => {
    const searchKeyword = event.target.value
    console.log(event.target.value);
    setSearchKeyword(searchKeyword)
    handleSearchQuery(searchKeyword)
    
}
const handleSuggestionClick = (event:any) => {
    console.log(event.target.textContent);
    setSearchKeyword(event.target.textContent)
    handleSearchQuery(event.target.textContent)
    setSuggestions([])
}

const handleSearchQuery = (query:string) => {
    if(query.length > 1) {
        const queryString = '?query=' + query
        setReq((RandomRecipeURL  + queryString + '&apiKey=' + foodApiKey))
    }
    else if(query.length < 1) {
        setSuggestions([])
    }else {
        console.log('short query');
        
    }
}
const requestRecipe = () => {
    setSuggestions([])
    axios.get(req)
    .then((res) => {
        console.log(res.data);
        if(res.data.results.length === 0) {
            setRecipeMessage('no recipe for that keyword')
        }
        setBaseURL(res.data.baseUri)
        setRecipes(res.data.results)
    })
}
const requestSuggestions = () => {
    axios.get(suggestionsUrl + '?number=10&query=' + searchKeyword + '&apiKey=' + foodApiKey )
    .then((res) => {
        console.log(res.data);
        setSuggestions(res.data)
    })
}

    
    useEffect(() => {
        requestSuggestions()
    }, [req])
    return (
        <main>
            <h1 className="recipe-page-title">search recipe by your needs</h1>
            <div className="input-wrapper">
                <input onInput={handleSearch} type="text" value={searchKeyword} />
                <button onClick={requestRecipe}>search</button>
                <div className="suggestions">
                {suggestions?.map((suggestion:any) => {
                    return (
                        <div onClick={handleSuggestionClick} key={suggestion.id}>{suggestion.title}</div>
                    )
                })}
            </div>
            </div>
            <div className="recipe-container">
                {(recipes.length > 0) ? recipes.map((recipe:any) => {
                    return (
                        <div className="recipe-card" key={recipe.title}>
                            <img src={baseURL + recipe.image} alt={recipe.title} />
                            <h4>{recipe.title}</h4>
                            <div className="card-footer">
                                <div className="ready-in">ready in : {recipe.readyInMinutes} minutes</div>
                                <div className="source">
                                    <a target="_blank" href={recipe.sourceUrl}>source link</a>
                                </div>
                            </div>
                        </div>
                    )
                }): <div className="no-recipe-message">{recipeMessage}</div>
                }
            </div>
        </main>
    )
}