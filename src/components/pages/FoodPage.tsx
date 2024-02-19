import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import { RandomRecipeURL, foodApiKey, suggestionsUrl } from "../../config/api/food"


export const FoodPage = () => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [req, setReq] = useState('')
    const [recipes, setRecipes] = useState([])
    const [baseURL, setBaseURL] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [recipeMessage, setRecipeMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isFirstLoad, setIsFirstLoad ] = useState(true)
    const wrapperRef = useRef(null);

    // outside click detection
    const useOutsideAlerter = (ref: any) => {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // outside click
                    setSuggestions([])
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(wrapperRef);
    // outside click detection ^

    const handleSearch = (event: any) => {
        setIsTyping(true)
        const searchKeyword = event.target.value
        console.log(event.target.value);
        setSearchKeyword(searchKeyword)
        handleSearchQuery(searchKeyword)
        setRecipeMessage('')
        setIsFirstLoad(false)

    }
    const handleSuggestionClick = (event: any) => {
        setIsTyping(false)
        console.log(event.target.textContent);
        setSearchKeyword(event.target.textContent)
        handleSearchQuery(event.target.textContent)
        setSuggestions([])
        requestRecipe()
    }

    const handleSearchQuery = (query: string) => {
        if (query.length > 1) {
            const queryString = '?query=' + query
            setReq((RandomRecipeURL + queryString + '&apiKey=' + foodApiKey))
        }
        else if (query.length < 1) {
            setSuggestions([])
        } else {
            console.log('short query');

        }
    }
    const requestRecipe = () => {
        setIsTyping(false)
        setSuggestions([])
        axios.get(req)
            .then((res) => {
                console.log(res.data);
                if (res.data.results.length === 0) {
                    setRecipeMessage('no recipe for that keyword')
                }
                setBaseURL(res.data.baseUri)
                setRecipes(res.data.results)
            })
    }
    const requestSuggestions = () => {
        axios.get(suggestionsUrl + '?number=5&query=' + searchKeyword + '&apiKey=' + foodApiKey)
            .then((res) => {
                console.log(res.data);
                setSuggestions(res.data)
                setRecipeMessage('no recipe for that keyword')
            })
    }



    useEffect(() => {
        requestSuggestions()
    }, [req])
    return (
        <main>
            <h1 className="recipe-page-title">search recipe by your needs</h1>
            <form className="input-wrapper">
                <input onChange={handleSearch} type="search" value={searchKeyword} />
                <button type="submit" onClick={requestRecipe}>search</button>
                {suggestions.length > 0 && isTyping ? //NOT DONE
                    <ul ref={wrapperRef} className="suggestions">
                        {suggestions.map((suggestion: any) => {
                            return (
                                <li className="suggestion-item"
                                    onClick={handleSuggestionClick}
                                    key={suggestion.id}
                                >
                                    {suggestion.title}
                                </li>
                            )
                        })}
                    </ul>
                    : null
                }
            </form>
            <div className="recipe-container">
                {(recipes.length > 0) ? recipes.map((recipe: any) => {
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
                }) : !isFirstLoad  ? 
                                    <div className="no-recipe-message">{recipeMessage}</div>
                                    : null
                }
            </div>
        </main>
    )
}