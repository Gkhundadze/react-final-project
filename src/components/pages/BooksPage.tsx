import { useEffect, useState } from 'react'
import { bookApiURL } from '../../config/api/books'
import axios from 'axios'

export const BooksPage = () => {
    const [books, setBooks] = useState([])





    useEffect(() => {
        axios.get(bookApiURL)
            .then((res:any) => {
                setBooks(res.data.data)
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <div className="books-container">
                {books.map((book:any) => {
                    return (
                        <div className='book-card' key={book.id}>
                            <img src={book.min_picture} alt={book.name}/>
                            <h3>{book.name}</h3>
                            <div className='book-price'>{book.variations[0].price} ₾</div>
                            <div></div>
                            <div className="stock-count">
                                დარჩენილია : <span className='count'>{book.isInStock}</span> ცალი
                            </div>
                            {book.translator ? 
                                <div className="translator">
                                თარგმანი :   <span className="person">
                                             {book.translator.fullname}
                                         </span>
                                </div>
                                : null
                            }
                            

                        </div>
                    )
                })}
            </div>
        </>
    )
}