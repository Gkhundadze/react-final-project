import { createContext, useEffect, useState } from "react";
import { Book } from "../interfaces/Book";


export const FavoritesContext = createContext<any>(null)

export const FavoritesProvider = ({children}:any) => {
    const [ favorites, setFavorites ] = useState<Book[]>(() => {
        const savedFavs = localStorage.getItem('favorites')
        if (savedFavs) {
            return JSON.parse(savedFavs)
        }
        return []
    })

    const handleAddData = (value:Book) => {
        
        if (!favorites.includes(value)) {
            setFavorites([...favorites, value]);
        }
    }
    
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    return (
        <FavoritesContext.Provider value={{
            handleAddData,
            favorites
        }}>
            {children}
        </FavoritesContext.Provider>
    )

}