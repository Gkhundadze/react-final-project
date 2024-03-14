import { NavLink } from "react-router-dom";
import { GoogleAuth } from "../other/GoogleAuth";




export const Header = () => {
    return (
        <header>
            <div className="container">
                <nav>
                    <div className="logo">
                        <NavLink to={'/'}>
                            <img src="https://geolab.hola.ge/wp-content/uploads/2023/10/geolab-ლოგო.png" alt="geolab logo" />
                        </NavLink>
                    </div>
                    <ul>
                        <li>
                            <NavLink to={'/'} >home</NavLink>
                        </li>
                        <li>
                            <NavLink to={'news'} >news</NavLink>
                        </li>
                        <li>
                            <NavLink to={'books'} >books</NavLink>
                        </li>
                        <li>
                            <NavLink to={'food'} >food</NavLink>
                        </li>
                        <li>
                            <NavLink to={'favorites'} >favorites</NavLink>
                        </li>
                        <li>
                            <GoogleAuth />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}