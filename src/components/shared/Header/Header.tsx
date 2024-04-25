import { NavLink } from "react-router-dom";
import { GoogleAuth } from "../other/GoogleAuth";
import { useContext} from "react";
import { NavigationContext } from "../../../contexts/NavigationContext";
import { FavoritesContext } from "../../../contexts/FavoritesContext";


export const Header = () => {
    const { navigationURL } = useContext(NavigationContext)
    const { favorites } = useContext(FavoritesContext)
    return (
        <header>
            <div className="container">
                <nav>
                    <div className="logo">
                        <NavLink to={'/'}>
                            <img src="https://geolab.edu.ge/wp-content/uploads/2023/10/geolab-ლოგო.png" alt="geolab logo" />
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
                            <NavLink to={navigationURL ? navigationURL : 'books'} >books</NavLink>
                        </li>
                        <li>
                            <NavLink to={'food'} >food</NavLink>
                        </li>
                        <li>
                            <NavLink to={'favorites'} >
                                <div className="favorites-button">
                                    <svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501.28 501.28">
                                        <g>
                                            <polygon points="501.28,194.37 335.26,159.33 250.64,12.27 250.64,419.77 405.54,489.01 387.56,320.29 	" />
                                            <polygon points="166.02,159.33 0,194.37 113.72,320.29 95.74,489.01 250.64,419.77 250.64,12.27 	" />
                                        </g>
                                    </svg>
                                    <span className="favorites-count">{favorites.length}</span>
                                </div>
                            </NavLink>
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