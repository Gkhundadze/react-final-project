import { Header } from "../shared/Header/Header";
import { Outlet } from 'react-router-dom';
import useScrollToTop from '../shared/other/hooks/useScrollToTop'


export const Root = () => {


    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}