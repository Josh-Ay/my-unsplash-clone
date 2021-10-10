import React from 'react';
import Search from "./Search";
import Button from "./Button";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

const Nav = (props) => {
    const [isMouseOver, setMouseHovered] = useState(false);

    const handleIn = () =>{setMouseHovered(true)};
    const handleOut = () =>{setMouseHovered(false)};

    const isMobileDevice = useMediaQuery({query: "(max-width: 767px)"});
    
    const routeToHome = () => { window.location = "/" };

    return (
        <nav>
            <div className="header-box">
                <header onClick={routeToHome}>
                    <picture style={{cursor: isMouseOver ? "pointer": "default"}} onMouseOver={handleIn} onMouseOut={handleOut}>
                        <source media="(max-width: 767px)" srcSet="images/my_unsplash_small_logo.svg 13x" />
                        <source media="(min-width: 768px)" srcSet="images/my_unsplash_logo.svg" />
                        <img src="images/my_unsplash_logo.svg" alt="Unsplash logo" />
                    </picture>

                </header>
                <Search />
            </div>
            <Button className="add-btn green-btn" content={isMobileDevice ? "+": "Add a photo"} mouseOver={true} action={props.showCard} />
        </nav>  
    );

};

export default Nav;