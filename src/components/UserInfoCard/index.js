import React from 'react';
import YouTube from 'react-youtube';
import SocialIcons from '../SocialIcons';
import TitleAndValue from '../TitleAndValue';
import GigsIvePlayedAt from '../GigIvePlayedAt';

import './styles.css';

const UserInfoCard = (props) => {

    const opts = {
        height: '100%',
        width: 'auto',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
      };

      const _onReady = (event) => {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
      }


    return (
        <div
            onClick={() => alert('where should i go to?')}
            className="div__user-info-card-medium-container"
            >

                <TitleAndValue title="Gigging Since: " value="2017" />
                <TitleAndValue title="Style: " value="Observational / Story-Telling" />
                <TitleAndValue title="Find Me At: " value="Farrs on a Monday" />
                <div className="div__youtube-container">
                    <YouTube
                        className="div__youtube"
                        videoId="tZdYXyiatic"
                        opts={opts}
                        onReady={_onReady}
                    />
                </div>
                <SocialIcons />
        </div> 
    )
}

export default UserInfoCard;