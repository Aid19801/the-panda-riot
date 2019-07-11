import React, { useEffect, useState } from 'react';
import './styles.css';

const stock = {
    original: 'http://www.eikojonesphotography.com/wp-content/uploads/2015/06/high-res-pano-format-detail.jpg',
    blurry: 'https://via.placeholder.com/300',
}

const ProfilePic = ({ srcProp }) => {
 
    const [ srcForProfilePic, setSrc ] = useState('https://via.placeholder.com/300');

    useEffect(() => {
        
    }, [])

    // then the src of the img element will change to it. 
    return (
        <div
            className="div__profile-pic-container"
            >
                <img src={srcProp} width={90} height={90} />

        </div> 
    )
}

export default ProfilePic;