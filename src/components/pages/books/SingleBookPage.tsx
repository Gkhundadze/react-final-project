import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Book } from "../../../interfaces/Book";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {scrollToTop} from '../../shared/other/scrollToTop'

import 'swiper/css/bundle';
import { BookCard } from "./BookCard";


export const SingleBookPage = () => {
    const [book, setBook] = useState<Book>()
    const [similarBooks, setSimilarBooks] = useState<Book[]>([])
    let { bookId } = useParams<string>()
    
    let location = useLocation()
    let navigate = useNavigate()
    const bookApiUrl: string = `https://api.palitral.ge/api/book/${bookId}?author=1&category=1&series=1&limit=5`


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
            const simalrBooksURL = `https://api.palitral.ge/api/book?category_id[]=${book.category_id}&per_page=10&author=1&except=${bookId}`
            axios.get(simalrBooksURL)
                .then((res) => {
                    if (res.status === 200 && res.statusText === 'OK') {
                        setSimilarBooks(res.data.data)
                    }
                })
                .catch((error) => alert(error.message))
        }
        
    }, [book])
    return (
        <main className="single-book-section">
            {book ?
                <>
                    <div className="navigation">
                        <button onClick={() => navigate(-1)}>go back</button>
                    </div>
                    <section className="book-section">
                        <div className="book-wrapper">
                            <BookCard 
                                bookData={book}
                                cardSize={'regular'}
                                specialClass='detailed'
                                clickable={false}
                                formURL={formURL}
                            />
                        </div>
                    </section>
                </>
                : null
            }
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
            <section className="similar-books-section" style={{ display: similarBooks ? 'block' : 'none' }}>
                <h3 className="section-title">Similar Books</h3>
                <div
                    className="similar-books-wrapper"
                >
                    <Swiper
                        navigation={true} 
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={similarBooks.length > 3 ? 3 : 1}
                        // onSlideChange={() => console.log('slide change')}
                        // onSwiper={(swiper) => console.log(swiper)}
                    >
                        {similarBooks ?
                            similarBooks.map((similarBook) => {
                                return (
                                    <SwiperSlide key={similarBook.id}>
                                        <BookCard
                                            bookData={similarBook}
                                            cardSize={'small'}
                                            clickable={true}
                                            path={formURL(similarBook.id) + '?authorId=' + similarBook.author_id}
                                        />
                                    </SwiperSlide>
                                )
                            })
                            : null
                        }
                    </Swiper>
                </div>
            </section>
        </main>
    )
}