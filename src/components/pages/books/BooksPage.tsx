import { useEffect, useState } from 'react'
import { bookApiURL, bookCategoryURL } from '../../../config/api/books'
import ReactLoading from "react-loading"
import axios from 'axios'
import { useLocation, Link, useSearchParams } from 'react-router-dom'
import { Book, bookCategory } from '../../../interfaces/Book'
import { imgErrorHandler } from '../../shared/other/brokenImageHandler'
import { BookCard } from './BookCard'

export const BooksPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState<Book[]>([])
    const [totalBooks, setTotalBooks] = useState(null)
    const [category, setCategory] = useState<bookCategory[]>([])
    const [page, setPage] = useState<number>(checkPage)
    const [lastPage, setLastPage] = useState(null)
    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    let location = useLocation()



    function checkPage() {
        if(searchParams.get('page') != null) {
            return Number(searchParams.get('page'))
        }
        return 1
    }

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
        setSearchParams(`page=${page}`)
        
        
    }, [page])
    useEffect(() => {
        axios.get(bookApiURL+ `?page=${page}`)
            .then((res: any) => {
                setTotalBooks(res.data.total)
                if (res.status === 200 && res.statusText === 'OK') {
                    setBooks(res.data.data)
                    console.log(res.data.data);
                    
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
                {books.length > 0 ? books.map((book: Book) => {
                    return (
                       <BookCard
                            key={book.id}
                            bookData={book}
                            cardSize={'regular'}
                            specialClass='promo'
                            path={location.pathname + '/' + book.id+ `?authorId=${book.author_id}`}
                            clickable={true}
                       />
                    )
                })
                    : <ReactLoading type={'balls'} color={'#2D9596'} height={667} width={375} />
                }
            </div>
        </>
    )
}