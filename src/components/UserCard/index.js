import React from 'react';
import ProfilePic from '../ProfilePic';
import UserNameAndTagline from '../UserNameAndTagline';
import './styles.css';


const UserCard = () => {

    return (
        <div className="div__user-card-container">
            <ProfilePic />
            <UserNameAndTagline />
        </div> 
    )
}

export default UserCard;