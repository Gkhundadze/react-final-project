import { useContext, useEffect, useState } from 'react'
import { bookApiURL, bookCategoryURL } from '../../../config/api/books'
import ReactLoading from "react-loading"
import axios from 'axios'
import { useLocation, Link, useSearchParams } from 'react-router-dom'
import { Book, bookCategory } from '../../../interfaces/Book'
import { BookCard } from './BookCard'
import { FavoritesContext } from '../../../contexts/FavoritesContext'
import { CategoryItem } from './CategoryItem'
import { scrollToTop } from '../../shared/other/scrollToTop'
import { TypeFilter } from './TypeFilter'
export const BooksPage = () => {
    const { setFavorites } = useContext(FavoritesContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState<Book[]>([])
    const [totalBooks, setTotalBooks] = useState(null)
    const [categories, setCategories] = useState<bookCategory[]>([])
    const [page, setPage] = useState<number>(checkPage)
    const [lastPage, setLastPage] = useState(null)
    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    const [mainCategory, setMainCategory] = useState<number | string>('')
    const [checkedCategoryIds, setCheckedCategoryIds] = useState<number[]>([])
    const [bookTypePaper, setBookTypePaper] = useState('')
    const [bookTypeAudio, setBookTypeAudio] = useState('')
    const [uncheck, setUncheck] = useState<boolean>(false)
    let location = useLocation()
    const bookPerPage = 24

    function resetAllFilters() {
        setMainCategory('')
        setCheckedCategoryIds([])
        setBookTypePaper('')
        setBookTypeAudio('')
        setPage(1)
        setUncheck(true)
    }


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
    function setMultipleCategory(catIds:any[]) {
        const categories:string[] = []
        if(catIds.length > 0) {
                catIds.forEach(categoryId => {
                categories.push(`&category_id[]=${categoryId}`)
            });
            return categories
        }
        return []
    }

    function generateCategoryURL(queriesArr:string[]) {
        let queryString = ''
        queriesArr.forEach((query) => {
            queryString += query
        })
        return queryString
    }
  
    
    useEffect(() => {
        scrollToTop()
        axios.get(bookApiURL+ `?page=${page}&discount=&discount_id=&serie_id=&type[]=${bookTypePaper}&type[]=${bookTypeAudio}&block=&best=&year=&author=1&${generateCategoryURL(setMultipleCategory(checkedCategoryIds))}`)
            .then((res: any) => {
                setTotalBooks(res.data.total)
                if (res.status === 200 && res.statusText === 'OK') {
                    if(res.data.data.length > 0 && res.data.last_page != null) {
                        setBooks(res.data.data)
                        setLastPage(res.data.last_page);
                    }
                    else {
                        setTimeout(() => {
                            console.log('something wrong');
                        }, 1000)
                        
                    }
                }
            })
            .catch((err) => console.log(err))
            disablePrevBtn(page)
            disableNextBtn(page)
            setSearchParams(`page=${page}&discount=&discount_id=&serie_id=&type[]=${bookTypePaper}&type[]=${bookTypeAudio}&block=&best=&year=&author=1&${generateCategoryURL(setMultipleCategory(checkedCategoryIds))}`)
            setUncheck(false)
    }, [page, mainCategory, checkedCategoryIds, bookTypeAudio, bookTypePaper])

    useEffect(() => {
        axios.get(bookCategoryURL)
            .then((res: any) => {
                if (res.status === 200 && res.statusText === 'OK') {
                    setCategories(res.data);
                }
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <main className='container books-page'>
                <aside>
                    <div className="category-wrapper">
                        <h4>კატეგორიები</h4>
                        {categories.map((singleCat) => {
                            return ( 
                                <CategoryItem 
                                    key={singleCat.id} 
                                    category={singleCat} 
                                    setMainCategory={setMainCategory}
                                    pageReset={setPage}
                                    setCheckedCategoryIds={setCheckedCategoryIds}
                                    checkedCategoryIds={checkedCategoryIds}
                                    uncheck={uncheck}
                                />
                            )
                        })
                        }
                    </div>
                    <div className="type-wrapper">
                        <h4>ტიპები</h4>
                        <TypeFilter 
                            bookType={bookTypePaper}
                            setBookType={setBookTypePaper}
                            name='paper'
                            uncheck={uncheck}
                        />
                        <TypeFilter 
                            bookType={bookTypeAudio}
                            setBookType={setBookTypeAudio}
                            name='audio'
                            uncheck={uncheck}
                        />
                    </div>
                    <div className="reset-filters">
                        <button
                            onClick={resetAllFilters}
                        >
                            გაწმენდა
                        </button>
                    </div>
                </aside>
                <section className='books'>
                {books.length > 0 ? <div className="book-quantity">
                    <span>მოიძებნა <b>{totalBooks}</b> წიგნი</span>
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
                </section>
            </main>
            {totalBooks > bookPerPage ? <>
                <div className="pagination">
                <button disabled={disablePrev} onClick={previousPage}>previous page</button>
                <span>current page :{page}</span>
                <button disabled={disableNext} onClick={nextPage}>next page</button>
            </div>
            </> : null

            }
        </>
    )
}