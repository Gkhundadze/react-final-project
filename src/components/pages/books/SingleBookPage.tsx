import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "../../../interfaces/Book";




export const SingleBookPage = () => {
    const [book, setBook] = useState<Book>()
    const [categoryId, setCategoryId] = useState<number>(0)
    const [similarBooks, setSimilarBooks] = useState<Book[]>([])
    let { bookId } = useParams<string>()
    let navigate = useNavigate()
    const url: string = `https://api.palitral.ge/api/book/${bookId}?author=1&category=1&series=1&limit=5`


        

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setBook(res.data);
            })
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        if(book) {
            setCategoryId(book.category_id)
            const simalrBooksURL = `https://api.palitral.ge/api/book?category_id[]=${categoryId}&per_page=5&author=1&except=${bookId}`
            axios.get(simalrBooksURL)
                .then((res) => {
                    if(res.status === 200 && res.statusText === 'OK') {
                        setSimilarBooks(res.data.data)
                        console.log(similarBooks);
                        
                    }
                })
                .catch((error) => console.log(error))
        }
    }, [book])
    return (
        <>
            {book ? 
                <>
                <div className="navigation">
                    <button onClick={() => navigate(-1)}>go back</button>
                </div>
                <div className="book-wrapper">
                    <img src={book.legacy_img} alt={book.name} />
                    <h1>{book.name}</h1>
                    <p>წელი {book.year}</p>
                    <p>{book.description}</p>
                </div>
                </>
            : null
            }
            {similarBooks ? 
                similarBooks.map((similarBook) => {
                    return (
                        <div key={similarBook.id} className="similar-book-wrapper">
                            {similarBook.name}
                        </div>
                    )
                })
            : null
            }
        </>
    )
}