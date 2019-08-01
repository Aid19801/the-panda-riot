import React from 'react';
import './styles.css';


const UserNameAndTagline = ({ username, tagline }) => {

    return (
        <div className="div__user-name-tagline-container">
            <h3 className="h3__user-name">{username}</h3>
            <p className="p__tagline">{tagline}</p>
        </div> 
    )
}

export default UserNameAndTagline;