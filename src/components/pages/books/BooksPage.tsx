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
import { PriceFilter } from './PriceFilter'
export const BooksPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {handleNavigationUrl } = useContext(NavigationContext)
    const [books, setBooks] = useState<Book[]>([])
    const [totalBooks, setTotalBooks] = useState(0)
    const [categories, setCategories] = useState<bookCategory[]>([])
    const [page, setPage] = useState<number>(checkPage)
    const [lastPage, setLastPage] = useState(null)
    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    const [checkedCategoryIds, setCheckedCategoryIds] = useState<number[]>(getCatIds())
    const [bookTypePaper, setBookTypePaper] = useState(getBookTypePaper())
    const [bookTypeAudio, setBookTypeAudio] = useState(getBookTypeAudio())
    const [startPrice, setStartPrice] = useState<number>(getStartPrice())
    const [endPrice, setEndPrice] = useState<number>(getEndPrice())
    const [expanded, setExpanded] = useState<boolean>(false)

    const [uncheck, setUncheck] = useState<boolean>(false)
    let location = useLocation()
    const bookPerPage = 24

    function resetAllFilters() {
        setCheckedCategoryIds([])
        setBookTypePaper('')
        setBookTypeAudio('')
        setPage(1)
        setUncheck(true)
        setStartPrice(1)
        setEndPrice(300)
    }


    function checkPage() {
        if (searchParams.get('page') != null) {
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

    function disablePrevBtn(pageNumber: any) {
        if (pageNumber === 1) {
            setDisablePrev(true)
        } else {
            setDisablePrev(false)
        }
    }

    function disableNextBtn(pageNumber: any) {
        if (pageNumber === lastPage) {
            setDisableNext(true)
        } else {
            setDisableNext(false)
        }
    }

    function setMultipleCategory(catIds: any[]) {
        const categories: string[] = []
        if (catIds.length > 0) {
            catIds.forEach(categoryId => {
                categories.push(`&category_id[]=${categoryId}`)
            });
            return categories
        }
        return []
    }

    function generateCategoryURL(queriesArr: string[]) {
        let queryString = ''
        queriesArr.forEach((query) => {
            queryString += query
        })
        return queryString
    }

    function getBookTypeAudio() {
        const [audio] = searchParams.getAll('type[]').filter((type) => type === 'audio')
        if(audio !== (null || undefined)) {
            return audio
        }else {
            return ''
        }
    }

    function getBookTypePaper() {
        const [paper] = searchParams.getAll('type[]').filter((type) => type === 'paper')
        if(paper !== (null || undefined)) {
            return paper
        }else {
            return ''
        }
    }

    function getStartPrice() {
        const _startPrice = searchParams.get('price_from')
        if(_startPrice !== null) {
            return Number(_startPrice)
        }else {
            return 1
        }
    }
    function getEndPrice() {
        const _endPrice = searchParams.get('price_to')
        if(_endPrice !== null) {
            return Number(_endPrice)
        }else {
            return 300
        }
    }

    function getCatIds() {
        const categoryIds: number[] = []
        const tempIds = searchParams.getAll('category_id[]')
        if(tempIds !== null) {
            tempIds.forEach((el) => {
                categoryIds.push(Number(el))
            })
            return categoryIds
        }else {
            return []
        }
    }
    
    const handleStartPrice = (_event: any) => {
        const value = _event.target.value.replace(/\D/g, "");
        setStartPrice(value)
    }

    const handleEndPrice = (_event: any) => {
        const value = _event.target.value.replace(/\D/g, "");
        setEndPrice(value)

    }

    function generateMainURL() {
        return bookApiURL + `?page=${page}&type[]=${bookTypePaper}&type[]=${bookTypeAudio}&author=1${generateCategoryURL(setMultipleCategory(checkedCategoryIds))}&price_from=${startPrice}&price_to=${endPrice}`
    }
    useEffect(() => {
        axios.get(bookCategoryURL)
            .then((res: any) => {
                if (res.status === 200 && res.statusText === 'OK') {
                    setCategories(res.data);
                }
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        setSearchParams(`page=${page}&type[]=${bookTypePaper}&type[]=${bookTypeAudio}&author=1&${generateCategoryURL(setMultipleCategory(checkedCategoryIds))}&price_from=${startPrice}&price_to=${endPrice}`);
        scrollToTop()
        handleNavigationUrl(location.pathname + `?page=${page}&type[]=${bookTypePaper}&type[]=${bookTypeAudio}&author=1&${generateCategoryURL(setMultipleCategory(checkedCategoryIds))}&price_from=${startPrice}&price_to=${endPrice}`);
        
        const fetchData = async () => {
            try {
                const mainURL = generateMainURL();
                const response = await axios.get(mainURL);
                setTotalBooks(response.data.total);
                if (response.status === 200 && response.statusText === 'OK') {
                    if (response.data.data.length > 0) {
                        setBooks(response.data.data);
                        setLastPage(response.data.last_page);
                    } else {
                        setBooks([]);
                        setLastPage(null);
                        setTimeout(() => {
                            console.log('something wrong');
                        }, 1000);
                    }
                }
                disablePrevBtn(page);
                disableNextBtn(page);
                setUncheck(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [page, checkedCategoryIds, bookTypeAudio, bookTypePaper, startPrice, endPrice])
    return (
        <>
            <main className='container books-page'>
                <aside className={`${expanded ? 'hide' : ''}`}>
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
                        <h4>ტიპის მიხედვით</h4>
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
                    <div className="price-filter">
                        <h4>ფასის მიხედვით</h4>
                        <PriceFilter 
                            startPrice={startPrice}
                            endPrice={endPrice}
                            handleStartPrice={handleStartPrice}
                            handleEndPrice={handleEndPrice}
                        />
                    </div>
                    <div className="reset-filters">
                        <button
                            onClick={resetAllFilters}
                        >
                            გაწმენდა
                        </button>
                    </div>
                    <div onClick={() => {
                        setExpanded(!expanded)
                    }} className={`arrow ${expanded ? '' : 'rotated'}`}>
                        <svg width={50} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z" data-name="Right"/></svg>
                    </div>
                </aside>
                <section className='books'>
                    {books.length > 0 ? <div className="book-quantity">
                        <span>მოიძებნა {totalBooks} წიგნი</span>
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
                                    path={location.pathname + '/' + book.id + `?authorId=${book.author_id}`}
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