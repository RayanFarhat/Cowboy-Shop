import { ChevronRightRounded } from '@mui/icons-material';
import React from 'react';

/* get type data and build card repersent the type components */
function TypeCard({ imgSrc, name, isActive }) {
    return (
        /* know if this items type is active or not */
        <div className={`typeCard ${isActive ? `active` : ``}`}>
            <div className="imgBox" >
                <img src={imgSrc} alt="" />
            </div>
            <h3>{name}</h3>
            <i className="loadMenu">
                <ChevronRightRounded />
            </i>
        </div >

    );
}

export default TypeCard;
