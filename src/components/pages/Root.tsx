import { Header } from "../shared/Header/Header";
import { Outlet } from 'react-router-dom';



export const Root = () => {


    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}