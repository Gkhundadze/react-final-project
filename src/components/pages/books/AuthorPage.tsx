import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Author, Book } from "../../../interfaces/Book";
import { useState, useEffect } from "react";
import { BookCard } from "./BookCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { imgErrorHandler } from "../../shared/other/brokenImageHandler";
import brokenImage from '../../../assets/images/broken-image.gif'
export const AuthorPage = () => {
    const [author, setAuthor] = useState<Author>()
    const [authorsOtherBooks, setAuthorsOtherBooks] = useState<Book[]>([])
    const [bookId, setBookId] = useState<number>(0)
    let [searchParams] = useSearchParams();
    const authorApiUrl: string = 'https://api.palitral.ge/api/author/'
    let navigate = useNavigate()


    
    
    function formURL(currentBookId:any) {
        const pathname = location.pathname
        const tempId = currentBookId
        const newPath = pathname.slice(0, 7) + tempId + '?authorId=' + author?.id
        
        return newPath
    }


    useEffect(() => {
        const authorID = searchParams.get('authorId')
        axios.get(authorApiUrl + authorID)
            .then((res) => {
                if (res.status === 200 && res.statusText === 'OK') {
                    setAuthor(res.data)
                    
                    setAuthorsOtherBooks(res.data.books)  
                }
            })
            .catch((error) => alert(error.message))
    }, [])



    return (
        <>
            <div className="navigation">
                <button onClick={() => navigate(-1)}>go back</button>
            </div>
            <section className="about-author">
                {author ? <div className="author-wrapper">
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
                : null}
                <div className="authors-books">
                    <h3 className="authors-books-title">ავტორის სხვა წიგნები</h3>
                    <Swiper
                        navigation={true} 
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={authorsOtherBooks.length > 3 ? 3 : 2}
                    >
                        {authorsOtherBooks ? authorsOtherBooks.map((authorsBook:Book) => {
                            return (
                                <SwiperSlide key={authorsBook.id}>
                                    <BookCard 
                                        bookData={authorsBook}
                                        formURL={formURL}
                                        clickable={true}
                                        cardSize={'small'}
                                    />
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