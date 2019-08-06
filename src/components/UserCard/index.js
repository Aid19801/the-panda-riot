import React from 'react';
import ProfilePic from '../ProfilePic';
import UserNameAndTagline from '../UserNameAndTagline';
import './styles.css';


const UserCard = ({ profilePicture, username, tagline }) => {

    return (
        <div className="div__user-card-container push-down-top-fix">
            <ProfilePic srcProp={profilePicture} />
            <UserNameAndTagline username={username} tagline={tagline} />
        </div> 
    )
}

export default UserCard;