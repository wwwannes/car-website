import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import searchPanelContext from '../../composables/Contexts';

import SearchIcon from '@mui/icons-material/Search';

/* https://animate.style */
import 'animate.css';

export default function CustomNavigation(){
    const [showMenu, setShowMenu] = useState(null);

    const searchContext = useContext(searchPanelContext);

    console.log(useLocation());

    return(
        <>
            <div className="menu-container">
                {useLocation().pathname === "/vehicles" &&
                    <div className="menu-link oh unbutton" onClick={searchContext.toggleSearchPanel}>
                        <SearchIcon fontSize="medium"/>
                    </div>
                }
                <button className={`menu-link oh unbutton underline ${showMenu ? "hide" : ""}`} onClick={() => setShowMenu(!showMenu)}>
                    <span className="oh__inner">Menu</span>
                </button>
            </div>

            <button className={`close close--menu oh unbutton ${showMenu ? "" : "hide"}`} aria-label="Close menu" onClick={() => setShowMenu(!showMenu)}>
                <span className="oh__inner">&#10005;</span>
            </button>

            <nav 
                className={
                    `menu 
                    ${showMenu && showMenu !== null ? "animate__animated animate__slideInDown" : ""}
                    ${!showMenu && showMenu !== null ? "animate__animated animate__slideOutUp" : ""}
                `}
            >
                <div className="menu__item" onClick={() => setShowMenu(false)}>
                    <NavLink 
                        to="/" 
                        className={`menu__item-inner ${(navData) => navData.isActive ? "active" : "" }`}
                    >
                        Homepage <sup>01</sup>
                    </NavLink>
                </div>
                <div className="menu__item" onClick={() => setShowMenu(false)}>
                    <NavLink 
                        to="vehicles" 
                        className={`menu__item-inner ${(navData) => navData.isActive ? "active" : "" }`}
                    >
                        Vehicle Stock <sup>02</sup>
                    </NavLink>
                </div>
                <div className="menu__item" onClick={() => setShowMenu(false)}>
                    <NavLink 
                        to="philosophy" 
                        className={`menu__item-inner ${(navData) => navData.isActive ? "active" : "" }`}
                    >
                        Our Philosophy <sup>03</sup>
                    </NavLink>
                </div>
                <div className="menu__item" onClick={() => setShowMenu(false)}>
                    <NavLink 
                        to="contact" 
                        className={`menu__item-inner ${(navData) => navData.isActive ? "active" : "" }`}
                    >
                        Get In Touch <sup>04</sup>
                    </NavLink>
                </div>
            </nav>
        </>
    )
}