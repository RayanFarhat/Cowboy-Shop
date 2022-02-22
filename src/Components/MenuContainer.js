import React from "react";

/* build header components */
function MenuContainer({ link, icon, isHome }) {


    /* in default home icon is active */
    return <li className={isHome ? 'active' : ''}>
        <a href={link}>
            <span className="icon"> {icon} </span>
        </a>
    </li>
}

export default MenuContainer;
