import React from 'react';
import './styles.css';

const SocialIcons = ({ facebook, twitter, youtube, website }) => {

    const repairUrl = url => {
        if (url.slice(0, 3) === 'www') {
            return `https://${url}`;
        }
        if (url.slice(0, 5) === 'http:') {
            let restOfUrl = url.slice(4, url.length);
            return `https${restOfUrl}`;
        }
        return url;
    }

    return (
        <div className="div__socials-container">
           
            { facebook !== 'unknown' && (
                <img
                    onClick={() => window.open(repairUrl(facebook), '_newtab')}
                    className="div__user-info-card-medium-socials-pic"
                    src="https://www.takcam.com/wp-content/uploads/2017/11/Black-FB-Logo.png"
                    alt="open mic comedian facebook logo"
                />
                )
            }

            { twitter !== 'unknown' && (
                <img
                    onClick={() => window.open(repairUrl(twitter), '_newtab')}
                    className="div__user-info-card-medium-socials-pic"
                    src="https://seeklogo.com/images/T/twitter-icon-circle-black-logo-35827D553B-seeklogo.com.png"
                    alt="open mic comedian twitter logo"
                />
            ) }

            { youtube !== 'unknown' && (
                <img
                    onClick={() => window.open(repairUrl(youtube), '_newtab')}
                    className="div__user-info-card-medium-socials-pic"
                    src="https://image.flaticon.com/icons/png/512/14/14326.png"
                    alt="open mic comedian youtube channel"
                />
            ) }
            { website !== 'unknown' && (
                <img
                    onClick={() => window.open(repairUrl(website), '_newtab')}
                    className="div__user-info-card-medium-socials-pic"
                    src="https://banner2.kisspng.com/20180810/ico/kisspng-logo-world-wide-web-computer-icons-website-portabl-domain-svg-png-icon-free-download-5662-online-5b6d5a17ceb3a6.4444298415338931438467.jpg"
                    alt="open mic comedian www logo"
                />
            ) }
        </div> 
    )
}

export default SocialIcons;