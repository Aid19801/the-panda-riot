import React from 'react';
import { useSpring, animated } from 'react-spring';
import { trimStringSpecifically } from '../../lib/utils';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export function InfoCard({ paneInfo, toggleMarker }) {
  // console.log('toggle marker prop: ', toggleMarker);
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  return (
    <animated.div
      className="card"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
    >

      <div id="strike-through"></div>
      <h1 className="h1-heading">{paneInfo.heading}</h1>
      <h2 className="h2-subheading">{paneInfo.subheading}</h2>
      <p className="p__gig-blurb">{trimStringSpecifically(paneInfo.paragraph, 290)}</p>

      <div className="div__info-pane-nights">
        { paneInfo.nights.map((each, i) => <h2 key={i} className="h2-subheading white">{each}</h2>) }
      </div>
      
      <div className={ toggleMarker ? "bg-img-div effect" : "bg-img-div" }>
        <img alt="open mic comedy venue promo" className="bg-img" src={ paneInfo.img === '' ? require('./mic.jpg') : paneInfo.img } />
      </div>
    </animated.div>
  )
}

