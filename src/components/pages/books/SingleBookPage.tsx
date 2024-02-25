import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link, useLocation, useSearchParams } from "react-router-dom";
import { Author, Book } from "../../../interfaces/Book";
import { imgErrorHandler } from '../../shared/other/brokenImageHandler'
import brokenImage from '../../../assets/images/broken-image.gif'



export const SingleBookPage = () => {
    const [book, setBook] = useState<Book>()
    const [categoryId, setCategoryId] = useState<number>(0)
    const [similarBooks, setSimilarBooks] = useState<Book[]>([])
    const [author, setAuthor] = useState<Author>()
    const [authorsOtherBooks, setAuthorsOtherBooks] = useState<Book[]>([])
    let [searchParams] = useSearchParams();
    let { bookId } = useParams<string>()
    let location = useLocation()
    let navigate = useNavigate()
    const bookApiUrl: string = `https://api.palitral.ge/api/book/${bookId}?author=1&category=1&series=1&limit=5`
    const authorApiUrl: string = 'https://api.palitral.ge/api/author/'


    function formURL(similarBookId: number) {
        const pathname = location.pathname
        const tempId = bookId?.toString()
        let newUrl = pathname.replace(`${tempId}`, '') + similarBookId
        return newUrl
    }



    useEffect(() => {
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
    useEffect(() => {
        const authorID = searchParams.get('authorId')
        axios.get(authorApiUrl + authorID)
            .then((res) => {
                if (res.status === 200 && res.statusText === 'OK') {
                    setAuthorsOtherBooks(res.data.books)
                    setAuthor(res.data)
                }
            })
            .catch((error) => alert(error.message))
    }, [book])
    return (
        <>
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
                            <p>{book.description}</p>
                        </div>
                    </section>
                </>
                : null
            }
            <section className="author-section">
                {author ? <>
                    <div className="author-wrapper">
                            <img 
                                className="author-image" 
                                src={author.img ? author.img : brokenImage} 
                                alt={author.fullname} 
                                onError={imgErrorHandler}
                            />
                            <span>{author.img}</span>
                            <h3>ავტორი : 
                                <strong className="author-fullname">
                                    {author.fullname}
                                </strong>
                            </h3>
                        </div>
                        <div className="authors-books">
                            {authorsOtherBooks ? authorsOtherBooks.map((authorsBook) => {
                    return (
                        <>
                            <div className="authors-book" key={authorsBook.author_id}>
                                <img src={authorsBook.min_picture} alt={authorsBook.name} />
                                <h4>{authorsBook.name}</h4>
                            </div>
                        </>
                    )
                })
                : null
                }
                    </div>
                </>
                    : <div> no data </div>
                }
            </section>
            <section className="similar-books-section" style={{ display: similarBooks ? 'block' : 'none' }}>
                <h3 className="section-title">Similar Books</h3>
                <div className="similar-books-wrapper">
                    {similarBooks ?
                        similarBooks.map((similarBook) => {
                            return (
                                <Link to={formURL(similarBook.id) + '?authorId=' + similarBook.author_id} key={similarBook.id} className="similar-book-card">
                                    <img src={similarBook.legacy_img} alt={similarBook.name} />
                                    <h4>{similarBook.name}</h4>
                                </Link>
                            )
                        })
                        : null
                    }
                </div>
            </section>
        </>
    )
}