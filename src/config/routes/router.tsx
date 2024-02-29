import { createBrowserRouter } from "react-router-dom"
import { Root } from "../../components/pages/Root"
import { ErrorPage } from '../../components/pages/ErrorPage'
import { MainPage } from '../../components/pages/MainPage'
import { NewsPage } from "../../components/pages/news/NewsPage"
import { FoodPage } from "../../components/pages/FoodPage"
import { BooksPage } from "../../components/pages/books/BooksPage"
import { SingleBookPage } from "../../components/pages/books/SingleBookPage"
import { AuthorPage } from "../../components/pages/books/AuthorPage"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MainPage />
            },
            {
                path: 'news',
                element: <NewsPage />
            },
            {
                path: 'books',
                element: <BooksPage />
            },
            {
                path: 'books/:bookId',
                element: <SingleBookPage />
            },
            {
                path: 'books/author/:author',
                element: <AuthorPage />
            },
            {
                path: 'food',
                element: <FoodPage />
            }
        ]
    }
])