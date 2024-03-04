import axios from "axios";
import { useParams, Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Author, Book } from "../../../interfaces/Book";
import { useState, useEffect } from "react";
import { BookCard } from "./BookCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { imgErrorHandler } from '../../shared/other/brokenImageHandler'
import brokenImage from '../../../assets/images/broken-image.gif'
import 'swiper/css/bundle';

export const AuthorPage = () => {
    const [author, setAuthor] = useState<Author>()
    const [authorsOtherBooks, setAuthorsOtherBooks] = useState<Book[]>([])
    const [bookId, setBookId] = useState<number>(0)
    // const [swiperInstance, setSwiperInstance] = useState()
    let [searchParams] = useSearchParams();
    const authorApiUrl: string = 'https://api.palitral.ge/api/author/'
    let navigate = useNavigate()


    
    
    function formURL() {
        const pathname = location.pathname
        const tempId = bookId?.toString()
        const newPath = pathname.slice(0, 7) + tempId + '?authorId=' + author?.id
        return newPath
    }


    useEffect(() => {
        const authorID = searchParams.get('authorId')
        const getBookId = Number(searchParams.get('bookId'))
        setBookId(getBookId)
        
        axios.get(authorApiUrl + authorID)
            .then((res) => {
                if (res.status === 200 && res.statusText === 'OK') {
                    setAuthorsOtherBooks(res.data.books)
                    setAuthor(res.data)
                }
            })
            .catch((error) => alert(error.message))
    }, [])



    return (
        <>
            <div className="navigation">
                <button onClick={() => navigate(-1)}>go back</button>
            </div>
            <section >
            {author ? <>
                <div className="author-wrapper">
                        <img
                            className="author-image"
                            src={author.img ? author.img : brokenImage}
                            alt={author.fullname}
                            onError={imgErrorHandler}
                        />
                        <h3>ავტორი :
                            <strong className="author-fullname">
                                {author.fullname}
                            </strong>
                        </h3>
                </div>
            <div className="authors-books">
                <h3 className="authors-books-title">ავტორის სხვა წიგნები</h3>
                        <Swiper
                            navigation={true} 
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={authorsOtherBooks.length > 3 ? 3 : 1}
                            // onSwiper={(swiper) => setSwiperInstance(swiper)}
                            // onSlideChange={() => console.log('slide change')}
                            // onSwiper={(swiper) => console.log(swiper)}
                        >
                            {authorsOtherBooks ? authorsOtherBooks.map((authorsBook) => {
                                return (
                                    <SwiperSlide key={authorsBook.id}>
                                        <BookCard 
                                        bookData={authorsBook}
                                        formURL={formURL}
                                     />
                                    </SwiperSlide>
                                        // <SwiperSlide key={authorsBook.id}>
                                        //     <Link
                                        //         to={formURL()}
                                        //         className="authors-book" key={authorsBook.author_id}
                                        //     >
                                        //         <img src={authorsBook.min_picture} alt={authorsBook.name} />
                                        //         <h4>{authorsBook.name}</h4>
                                        //     </Link>
                                        // </SwiperSlide>
                                )
                            })
                                : null
                            }
                        </Swiper>
                    </div>
            </>
                    : null
                    }
            </section>
        </>
    )
}