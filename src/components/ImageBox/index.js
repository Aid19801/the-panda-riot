import React from 'react';
import { useSpring, animated } from 'react-spring';
import './styles.css';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function ImageBox({ src, blurb, link }) {
    
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));

    return (
      <animated.div
        onClick={() => window.open(link, '_newtab')}
        className="div__image-box"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
      >
        <p className="p__image-box-blurb">{blurb.length > 170 ? blurb.slice(0, 170) : blurb}</p>
        <img src={src} className="img__img-box" />
      </animated.div>
    )
  }

export default ImageBox;