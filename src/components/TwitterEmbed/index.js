import React, { Component } from 'react'
import { Timeline } from 'react-twitter-widgets'
import './styles.scss';

const TwitterEmbed = ({ twitterHandle }) => (
    <div className="twitter-embed">
        <Timeline
            dataSource={{
                sourceType: 'profile',
                screenName: twitterHandle
            }}
            options={{
                username: twitterHandle,
                height: '400',
                theme: 'dark',
                borderColor: '#FFA500',
                linkColor: '#FFA500',
            }}
            onLoad={() => console.log('Timeline is loaded!')}
        />
    </div>
)
export default TwitterEmbed;