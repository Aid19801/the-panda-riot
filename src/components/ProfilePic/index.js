import React, { useEffect, useState } from 'react';
import './styles.css';

const stock = {
    original: 'http://www.eikojonesphotography.com/wp-content/uploads/2015/06/high-res-pano-format-detail.jpg',
    blurry: 'https://via.placeholder.com/300',
}

const ProfilePic = () => {

    const [ lazyLoadedImage, setLazyLoadedImage ] = useState(stock.blurry);

    // 1. the default state, onload of the image is the 'blurry' one above.
    useEffect(() => {
        const img = new Image();
        // 2. when component mounts, create a new image <img> element ^^
        
        img.src = stock.original;
        // 3. give it the src of the actual image you want to render

        // 4. when its loaded, set the state to it.
        img.onload = () => {
            setLazyLoadedImage(img.src);
        }
    }, [])
    
    const spinner = () => {
        return <div className="lds-ripple"><div></div><div></div></div>
    }

    // then the src of the img element will change to it. 
    return (
        <div
            className="div__profile-pic-container">

                {  lazyLoadedImage  === stock.blurry ? spinner() : (
                    <img
                    className="img__person-info-card-profile-pic"
                    src={lazyLoadedImage}
                />
                ) }
         

        </div> 
    )
}

export default ProfilePic;