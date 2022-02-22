import React from 'react';

/* get the name of the user and build the banner components */
function BannerName({ name }) {
    return (
        <div className="BannerContent">
            <h3>Hello {name}</h3>
            <p>This is shop for Orginal American West Cowboys Outfits from <span>1849</span>. Please enjoy :)</p>
        </div>
    );
}

export default BannerName;
