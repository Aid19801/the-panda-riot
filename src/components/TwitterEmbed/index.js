import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import './styles.scss';

const TwitterEmbed = ({ twitterHandle }) => {

    if (twitterHandle) {
        return (
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
                />
            </div>
    
        );
    } else {
        return (
        <div className="twitter-embed">
            youtube section    
        </div>
        )
    }
}
export default TwitterEmbed;