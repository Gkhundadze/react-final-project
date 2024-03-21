import { useContext, useEffect, useState } from 'react'
import { bookApiURL, bookCategoryURL } from '../../../config/api/books'
import ReactLoading from "react-loading"
import axios from 'axios'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Book, bookCategory } from '../../../interfaces/Book'
import { BookCard } from './BookCard'
import { CategoryItem } from './CategoryItem'
import { scrollToTop } from '../../shared/other/scrollToTop'
import { TypeFilter } from './TypeFilter'
import { NavigationContext } from '../../../contexts/NavigationContext'
export const BooksPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {navigationURL, handleNavigationUrl} = useContext(NavigationContext)
    const [books, setBooks] = useState<Book[]>([])
    const [totalBooks, setTotalBooks] = useState(null)
    const [categories, setCategories] = useState<bookCategory[]>([])
    const [page, setPage] = useState<number>(checkPage)
    const [lastPage, setLastPage] = useState(null)
    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    const [checkedCategoryIds, setCheckedCategoryIds] = useState<number[]>([])
    const [bookTypePaper, setBookTypePaper] = useState('')
    const [bookTypeAudio, setBookTypeAudio] = useState('')
    const [uncheck, setUncheck] = useState<boolean>(false)
    let location = useLocation()
    const bookPerPage = 24

    function resetAllFilters() {
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
    
    function getLocalQuery() {
        const categoryIds:number[] = [] 
        if(searchParams.getAll('category_id[]') !== null) {
            searchParams.getAll('category_id[]').forEach((el) => {
                categoryIds.push(Number(el))
            })
            setCheckedCategoryIds(categoryIds)
        }else {
            return categoryIds
        }
    }
    function generateMainURL() {
        const url = bookApiURL+ `?page=${page}&discount=&discount_id=&serie_id=&type[]=${bookTypePaper}&type[]=${bookTypeAudio}&block=&best=&year=&author=1${generateCategoryURL(setMultipleCategory(checkedCategoryIds))}` 
        return url
    }
    
    useEffect(() => {
        getLocalQuery()
        axios.get(bookCategoryURL)
            .then((res: any) => {
                if (res.status === 200 && res.statusText === 'OK') {
                    setCategories(res.data);
                }
            })
            .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        setSearchParams(`page=${page}&discount=&discount_id=&serie_id=&type[]=${bookTypePaper}&type[]=${bookTypeAudio}&block=&best=&year=&author=1&${generateCategoryURL(setMultipleCategory(checkedCategoryIds))}`)
        handleNavigationUrl(location.pathname + location.search)
        scrollToTop()
                if(bookTypeAudio || bookTypePaper || checkedCategoryIds) {
                axios.get(generateMainURL())
                .then((res: any) => {
                    setTotalBooks(res.data.total)
                    if (res.status === 200 && res.statusText === 'OK') {
                        if(res.data.data.length > 0) {
                            setBooks(res.data.data)
                            setLastPage(res.data.last_page);
                        }
                        else {
                            setBooks([])
                            setLastPage(null)
                            setTimeout(() => {
                                console.log('something wrong');
                            }, 1000)
                        }
                    }
                })
                .catch((err) => console.log(err))
                }
        disablePrevBtn(page)
        disableNextBtn(page)
        setUncheck(false)
        
    }, [page, checkedCategoryIds, bookTypeAudio, bookTypePaper, navigationURL])

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