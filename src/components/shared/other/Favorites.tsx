import { useContext } from "react"
import { FavoritesContext } from "../../../contexts/FavoritesContext"
import { Book } from "../../../interfaces/Book";
import { BookCard } from "../../pages/books/BookCard";



export const Favorites = () => {
    const {favorites} = useContext(FavoritesContext)

    return (
        <div className="favorites-wrapper">
        {favorites ? favorites.map((favoriteBook:Book) => {
                            return (
                                    <BookCard 
                                        key={favoriteBook.id}
                                        bookData={favoriteBook}
                                        clickable={false}
                                        cardSize={'extra-small'}
                                        specialClass={'favorite'}
                                    />
                            )
                        })
                            : null
                        }
        </div>
    )
}