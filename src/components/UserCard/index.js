import React from 'react';
import ProfilePic from '../ProfilePic';
import UserNameAndTagline from '../UserNameAndTagline';
import './styles.css';


const UserCard = () => {

    return (
        <div className="div__user-card-container">
            <ProfilePic srcProp="https://hungarytoday.hu/wp-content/uploads/2018/02/18ps27.jpg" />
            <UserNameAndTagline />
        </div> 
    )
}

export default UserCard;