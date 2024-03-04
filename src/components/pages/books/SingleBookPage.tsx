import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link, useLocation, useSearchParams } from "react-router-dom";
import { Author, Book } from "../../../interfaces/Book";
import { imgErrorHandler } from '../../shared/other/brokenImageHandler'
import brokenImage from '../../../assets/images/broken-image.gif'
import { Swiper, SwiperSlide } from 'swiper/react';
import {scrollToTop} from '../../shared/other/scrollToTop'

import 'swiper/css';

export const SingleBookPage = () => {
    const [book, setBook] = useState<Book>()
    const [categoryId, setCategoryId] = useState<number>(0)
    const [similarBooks, setSimilarBooks] = useState<Book[]>([])
    // const [author, setAuthor] = useState<Author>()
    // const [authorsOtherBooks, setAuthorsOtherBooks] = useState<Book[]>([])
    // let [searchParams] = useSearchParams();
    let { bookId } = useParams<string>()
    
    let location = useLocation()
    let navigate = useNavigate()
    const bookApiUrl: string = `https://api.palitral.ge/api/book/${bookId}?author=1&category=1&series=1&limit=5`
    // const authorApiUrl: string = 'https://api.palitral.ge/api/author/'


    function formURL(similarBookId: number) {
        const pathname = location.pathname
        const tempId = bookId?.toString()
        let newUrl = pathname.replace(`${tempId}`, '') + similarBookId
        return newUrl
    }
    function formAuthorPageURL (authorName:string, authorId:number):string {
        const pathname = location.pathname
        const tempId = bookId?.toString()
        const [name, lastname] = authorName.includes('-') ? authorName.split('-') : authorName.split(' ')
        let authorPageURL = pathname.replace(`${tempId}`, `author/${name + '-' + lastname + '?authorId=' + authorId + '&bookId=' + bookId}`)
        
        // console.log(author);
        
        return authorPageURL
        
    }



    useEffect(() => {
        scrollToTop()

        axios.get(bookApiUrl)
            .then((res) => {
                if (res.status === 200 && res.statusText === 'OK') {
                    setBook(res.data);
                }
            })
            .catch((error) => alert(error.message))
    }, [bookId])

    useEffect(() => {
        if (book) {
            setCategoryId(book.category_id)
            const simalrBooksURL = `https://api.palitral.ge/api/book?category_id[]=${categoryId}&per_page=5&author=1&except=${bookId}`
            axios.get(simalrBooksURL)
                .then((res) => {
                    if (res.status === 200 && res.statusText === 'OK') {
                        setSimilarBooks(res.data.data)
                    }
                })
                .catch((error) => alert(error.message))
        }
    }, [book])
    // useEffect(() => {
    //     const authorID = searchParams.get('authorId')
    //     axios.get(authorApiUrl + authorID)
    //         .then((res) => {
    //             if (res.status === 200 && res.statusText === 'OK') {
    //                 setAuthorsOtherBooks(res.data.books)
    //                 setAuthor(res.data)
    //             }
    //         })
    //         .catch((error) => alert(error.message))
    // }, [book])
    return (
        <>
            {/* single book section */}
            {book ?
                <>
                    <div className="navigation">
                        <button onClick={() => navigate(-1)}>go back</button>
                    </div>
                    <section className="book-section">
                        <div className="book-wrapper">
                            <img
                                src={book.legacy_img}
                                alt={book.name}
                                onError={imgErrorHandler}
                            />
                            <h1>{book.name}</h1>
                            <p>წელი {book.year}</p>
                            {book.description ? <p>{book.description}</p> : <p> წიგნის აღწერა ვერ მოიძებნა</p> }
                        </div>
                    </section>
                </>
                : null
            }
            {/* authors section */}
            <section className="author-section">
                {book?.author ? <>
                    <div className="author-wrapper">
                        <Link to={formAuthorPageURL(book?.author.fullname, book.author_id)}>ავტორი : 
                            <strong className="author-fullname">
                                {book?.author.fullname}
                            </strong>
                        </Link>
                    </div>
                </>
                    : <div>ავტორი ვერ მოიძებნა</div>
                }
            </section>
            {/* similar books section */}
            <section className="similar-books-section" style={{ display: similarBooks ? 'block' : 'none' }}>
                <h3 className="section-title">Similar Books</h3>
                <div
                    className="similar-books-wrapper"
                >
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={similarBooks.length > 3 ? 3 : 1}
                        // onSlideChange={() => console.log('slide change')}
                        // onSwiper={(swiper) => console.log(swiper)}
                    >
                        {similarBooks ?
                            similarBooks.map((similarBook) => {
                                return (
                                    <SwiperSlide key={similarBook.id}>
                                        <Link
                                            to={formURL(similarBook.id) + '?authorId=' + similarBook.author_id}
                                            className="similar-book-card"
                                        >
                                            <img src={similarBook.legacy_img} alt={similarBook.name} />
                                            <h4>{similarBook.name}</h4>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })
                            : null
                        }
                    </Swiper>
                </div>
            </section>
        </>
    )
}