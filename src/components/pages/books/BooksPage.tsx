import { useCallback, useEffect, useState } from 'react'
import { bookApiURL, bookCategoryURL } from '../../../config/api/books'
import ReactLoading from "react-loading"
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'
import { bookCategory } from '../../../interfaces/Book'





export const BooksPage = () => {
    const [books, setBooks] = useState([])
    const [totalBooks, setTotalBooks] = useState(null)
    const [category, setCategory] = useState<bookCategory[]>([])
    const [page, setPage] = useState<number>(1)
    const [lastPage, setLastPage] = useState(null)
    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    let location = useLocation()

    function nextPage() {
        setPage(page + 1)
    }

    function previousPage() {
        setPage(page - 1)
    }
    function disablePrevBtn(pageNumber:any) {
        if(pageNumber === 1) {
            setDisablePrev(true)
        }else {
            setDisablePrev(false)

        }
        
    }
    function disableNextBtn(pageNumber:any) {
        if(pageNumber === lastPage) {
            setDisableNext(true)
        }else {
            setDisableNext(false)
        }
    }

    useEffect(() => {
        disablePrevBtn(page)
        disableNextBtn(page)
    }, [page])
    useEffect(() => {
        axios.get(bookApiURL+ `?page=${page}`)
            .then((res: any) => {
                setTotalBooks(res.data.total)
                if (res.status === 200 && res.statusText === 'OK') {
                    setBooks(res.data.data)
                    setLastPage(res.data.last_page);
                }
            })
            .catch((err) => console.log(err))
    }, [page])

    useEffect(() => {
        axios.get(bookCategoryURL)
            .then((res: any) => {
                if (res.status === 200 && res.statusText === 'OK') {
                    setCategory(res.data);
                }
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <div className="category-wrapper">
                {category.map((singleCat) => {
                    return (
                        <span key={singleCat.id} className='category-name'>
                            {singleCat.name + ', '}
                        </span>
                    )
                })
                }
            </div>
            <div className="pagination">
                <button disabled={disablePrev} onClick={previousPage}>previous page</button>
                <span>current page :{page}</span>
                <button disabled={disableNext} onClick={nextPage}>next page</button>
            </div>
            {books.length > 0 ? <div className="book-quantity">
                <span>სულ <b>{totalBooks}</b> წიგნი</span>
            </div>
                : null
            }
            <div className="books-container">
                {books ? books.map((book: any) => {
                    return (
                        <div className='book-card' key={book.id}>
                            <Link to={location.pathname + '/' + book.id}>
                                <img src={book.min_picture} alt={book.name} />
                            </Link>
                            <h3>{book.name}</h3>
                            <div className='book-price'>{book.variations[0].price} ₾</div>
                            <div></div>
                            <div className="stock-count">
                                დარჩენილია : <span className='count'>{book.isInStock}</span> ცალი
                            </div>
                            {book.translator
                                ? <div className="translator">
                                    თარგმანი :   <span className="person">
                                        {book.translator.fullname}
                                    </span>
                                </div>
                                : null
                            }
                            <Link 
                                to={location.pathname + '/' + book.id}
                                className='details-page'
                            >
                                დეტალურად
                            </Link>


                        </div>
                    )
                })
                    : <ReactLoading type={'balls'} color={'#2D9596'} height={667} width={375} />
                }
            </div>
        </>
    )
}