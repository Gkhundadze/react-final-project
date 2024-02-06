import { createBrowserRouter } from "react-router-dom"
import { Root } from "../../components/pages/Root"
import { ErrorPage } from '../../components/pages/ErrorPage'
import { MainPage } from '../../components/pages/MainPage'
import { NewsPage } from "../../components/pages/NewsPage"


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
            }
        ]
    }
])