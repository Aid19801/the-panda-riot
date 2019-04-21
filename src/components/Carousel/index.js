import { render } from 'react-dom'
import React, { useState, useCallback } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useTransition, animated } from 'react-spring'
import './styles.scss'
import { TrafficLights, CarouselColumnTwo } from '../index';
import TwitterEmbed from '../TwitterEmbed';

export default function Carousel({ info }) {

  const isShowing = info.imgs.length !== 0;

  const nopages = [
    ({ style }) => (
    
    <animated.div style={{ ...style, background: 'lightgrey', position: 'inherit' }}>
      
      <p className="carousel-p">// select a gig //</p>
      
      <img src={require('./mic.jpeg')} height="100%" width="100%" />
    </animated.div>
    )
  ]


  const pages = [
    ({ style }) => (
    
    // 1. NIGHTS OF WEEK *AND* BRINGER / WALKINS ETC
    <animated.div style={{ ...style, background: 'lightgrey', position: 'inherit' }}>
    
      <Container className="flex-stack">
          <Row className="flex-row">
            <Col className="flex-col-neartop" sm={6}>
              <TrafficLights nights={info.nights} />
            </Col>
            
            <Col className="flex-col" sm={6}>

              <div className="col-1">
                <table>
                  <tr>
                    <th>Bringer</th>
                    <th>WalkIns</th>
                    <th>Prebook</th>
                  </tr>

                  <tr>
                    <td>{ info.bringer ? "yes" : "no" }</td>
                    <td>{ info.walkins ? "yes" : "no" }</td>
                    <td>{ info.prebook ? "yes" : "no" }</td>
                  </tr>
                </table>
              </div>
              <div className="col-2">
                <p>Nearest Tube/s</p>
                {info.nearestTubes.map((each, i) => <h4 style={{ marginBottom: 2 }}>{each}</h4>)}
              </div>
            
      

            </Col>
            
          </Row>
      </Container>

      <img src={info.imgs[0]} height="100%" width="100%" />
      
    </animated.div>
    ),

    // 2. TWITTER OR FB
    ({ style }) => (
      <animated.div style={{ ...style, background: 'lightblue', position: 'inherit' }}>
  
        <Container className="flex-stack">
          <Row className="tweet-row">
            <Col sm={6}>
              <TwitterEmbed twitterHandle={info.twitterHandle} />
            </Col>
            <Col sm={6}>
              <div className="flex-mini-stack">

              </div>
            </Col>
          </Row>
        </Container>
        <img src={info.imgs[1]} height="100%" width="100%" />
        
      </animated.div>
    ),
    ({ style }) => <animated.div style={{ ...style, background: 'lightgreen', position: 'inherit' }}>

      
      <Container className="flex-stack">
          <Row>
            <Col sm={6}>i am a 6 col container</Col>
            <Col sm={6}>i am a 6 col container</Col>
          </Row>
        </Container>

      <img src={info.imgs[2]} height="100%" width="100%" />
      
    </animated.div>,
  ]
  
  const [index, set] = useState(0);

  const onClick = useCallback(() => set(state => (state + 1) % 3), []);

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%, 0 , 0)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' },
  });

  return (
    <div className="simple-trans-main" onClick={onClick}>
      { transitions.map(({ item, props, key }) => {
        const Page = isShowing ? pages[item] : nopages[0];

        return <Page key={key} style={props} />
      })}
    </div>
  )
}


