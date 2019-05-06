import React from 'react'
import './styles.scss';

function AdvertBox({ link, src, text }) {
  return (
    <div className="div__advert-box margin-top padding-on" onClick={() => window.open(link, '_newtab')}>
      <div className="img-container">
        <img alt="comedy gig advert" className="advert-img" src={src} />
      </div>
        <h4>{text}</h4>
    </div>
  )
}

export default AdvertBox;