import { useContext, useEffect, useState } from 'react'
import { bookApiURL, bookCategoryURL } from '../../../config/api/books'
import ReactLoading from "react-loading"
import axios from 'axios'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useLocation, useSearchParams } from 'react-router-dom'
import { Book, bookCategory } from '../../../interfaces/Book'
import { BookCard } from './BookCard'
import { CategoryItem } from './CategoryItem'
import { scrollToTop } from '../../shared/other/scrollToTop'
import { TypeFilter } from './TypeFilter'
import { NavigationContext } from '../../../contexts/NavigationContext'
import { PriceFilter } from './PriceFilter'
import { debounce } from '@mui/material';
export const BooksPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { navigationURL, handleNavigationUrl } = useContext(NavigationContext)
    const [books, setBooks] = useState<Book[]>([])
    const [totalBooks, setTotalBooks] = useState(0)
    const [categories, setCategories] = useState<bookCategory[]>([])
    const [page, setPage] = useState<number>(checkPage)
    const [lastPage, setLastPage] = useState(null)
    const [disablePrev, setDisablePrev] = useState(false)
    const [disableNext, setDisableNext] = useState(false)
    const [checkedCategoryIds, setCheckedCategoryIds] = useState<number[]>([])
    const [bookTypePaper, setBookTypePaper] = useState('')
    const [bookTypeAudio, setBookTypeAudio] = useState('')
    const [startPrice, setStartPrice] = useState<number>(1)
    const [endPrice, setEndPrice] = useState<number>(300)


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

    function getLocalQuery() {
        const categoryIds: number[] = []
        const temp = searchParams.getAll('category_id[]')
        const _priceFrom = searchParams.get('price_from')
        const _priceTo = searchParams.get('price_to')
        if (_priceFrom && _priceTo) {
            setStartPrice(Number(_priceFrom))
            setEndPrice(Number(_priceTo))
        }
        if (temp !== null) {
            temp.forEach((el) => {
                categoryIds.push(Number(el))
            })
            setCheckedCategoryIds(categoryIds)
        }
    }
    function generateMainURL() {
        setSearchParams(`page=${page}&type[]=${bookTypePaper}&type[]=${bookTypeAudio}&author=1&${generateCategoryURL(setMultipleCategory(checkedCategoryIds))}&price_from=${startPrice}&price_to=${endPrice}`);

        return bookApiURL + `?page=${page}&type[]=${bookTypePaper}&type[]=${bookTypeAudio}&author=1${generateCategoryURL(setMultipleCategory(checkedCategoryIds))}&price_from=${startPrice}&price_to=${endPrice}`
    }

    const handleStartPrice = (_event: any) => {
        const value = _event.target.value.replace(/\D/g, "");
        setStartPrice(value)
    }
    const handleEndPrice = (_event: any) => {
        const value = _event.target.value.replace(/\D/g, "");
        setEndPrice(value)

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
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            await handleNavigationUrl(location.pathname + location.search);
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
                <aside>
                    <div className="category-wrapper">
                        <h4>კატეგორიის მიხედვით</h4>
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
                        <input
                            value={startPrice}
                            type="text"
                            pattern="[0-9]"
                            maxLength={3}
                            onChange={handleStartPrice}
                        />
                        <input
                            value={endPrice}
                            type="text"
                            pattern="[0-9]"
                            maxLength={4}
                            onChange={handleEndPrice}
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