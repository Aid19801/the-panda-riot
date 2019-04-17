import React from 'react';
import { useSpring, animated, Spring } from 'react-spring';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export function InfoCard({ paneInfo }) {
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  return (
    <animated.div
      class="card"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
    >

      <div id="strike-through"></div>
      <h1 className="h1-heading">{paneInfo.heading}</h1>
      <h2 className="h2-subheading">{paneInfo.subheading}</h2>
      <p className="p-blurb">{paneInfo.paragraph}</p>

      <div className="bg-img-div">
        <img className="bg-img" src={ paneInfo.img === '' ? require('./mic.jpg') : paneInfo.img } />
      </div>
    </animated.div>
  )
}

