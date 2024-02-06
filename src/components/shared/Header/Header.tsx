import { NavLink } from "react-router-dom";




export const Header = () => {
    return (
        <header className="container">
            <nav>
                <div className="logo">
                    <a href="#">
                        <img src="https://geolab.hola.ge/wp-content/uploads/2023/10/geolab-ლოგო.png" alt="geolab logo" />
                    </a>
                </div>
                <ul>
                    <li>
                        <NavLink to={'/'} >home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'news'} >news</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}