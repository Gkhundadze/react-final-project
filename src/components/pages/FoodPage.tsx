import { useEffect, useState } from "react"
import axios from 'axios'
import { RandomRecipeURL, foodApiKey } from "../../config/api/food"


export const FoodPage = () => {
const [searchKeyword, setSearchKeyword] = useState('')
const [req, setReq] = useState('')
const [recipes, setRecipes] = useState([])
const [baseURL, setBaseURL] = useState('')

const handleSearch = (event:any) => {
    const searchKeyword = event.target.value
    console.log(event.target.value);
    setSearchKeyword(searchKeyword)
    handleSearchQuery(searchKeyword)
    
}

const handleSearchQuery = (query:string) => {
    if(query.length > 3) {
        const queryString = '?query=' + query
        setReq((RandomRecipeURL  + queryString + '&apiKey=' + foodApiKey))
    }else {
        console.log('short query');
        
    }
}
const requestRecipe = () => {
    axios.get(req)
    .then((res) => {
        console.log(res.data);
        setBaseURL(res.data.baseUri)
        setRecipes(res.data.results)
    })
}

    useEffect(() => {
        console.log(req);
        
    }, [req])
    return (
        <main>
            <h1 className="recipe-page-title">search recipe by your needs</h1>
            <div className="input-wrapper">
                <input onInput={handleSearch} type="text" value={searchKeyword} />
                <button onClick={requestRecipe}>search</button>
            </div>

            <div className="recipe-container">
                {recipes.map((recipe:any) => {
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
                })}
            </div>
        </main>
    )
}