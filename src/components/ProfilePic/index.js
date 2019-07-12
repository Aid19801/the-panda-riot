import React, { useEffect, useState } from 'react';
import './styles.css';

// const stock = {
//     original: 'http://www.eikojonesphotography.com/wp-content/uploads/2015/06/high-res-pano-format-detail.jpg',
//     blurry: 'https://via.placeholder.com/300',
// }

const ProfilePic = ({ srcProp }) => {


    return (
        <div
            className="div__profile-pic-container"
            >
                <img
                    className="img__person-info-card-profile-pic"
                    src={srcProp}
                    width={90}
                    height={90}
                />

        </div> 
    )
}

export default ProfilePic;