// import { useState } from 'react';
// es-lint no-unused-vars
import {useEffect, useState} from 'react';
import Particles from 'react-tsparticles';
import confetiParticlesOptions from './confetisParticlesOptions';
import ballsParticlesOptions from './ballsParticlesOptions';

let interval = 0;
export const Background = ({count, type}) => {
  let [particlesClass, setParticlesClass] = useState('');
  let [options, setOptions] = useState(ballsParticlesOptions);

  useEffect(() => {
    console.log('Background', count, type);
    let options = {};
    if (type === 'balls') {
      options = {
        ...ballsParticlesOptions,
        particles: {
          ...ballsParticlesOptions.particles,
          number: {
            // density: {
            //   enable: true,
            //   area: 800,
            //   factor: 1000,
            // },
            // limit: 0,
            value: count, // Num particulas
          },
        },
        // background: {
        //   color: {
        //     value: 'red',
        //   },
        //   image: "url('/images/background-1.jpeg')",
        //   position: '50% 50%',
        //   repeat: 'no-repeat',
        //   size: 'cover',
        //   opacity: 0.1,
        // },
        // backgroundMask: {
        //   composite: 'destination-in',
        //   cover: {
        //     color: '#ffffff00',
        //     opacity: 1,
        //   },
        //   enable: false,
        // },
      };
    } else if (type === 'confeti') {
      options = {
        ...confetiParticlesOptions,
        background: {
          color: {
            value: 'transparent',
          },
          // image: "url('/images/background-1.jpeg')",
          position: '50% 50%',
          repeat: 'no-repeat',
          size: 'cover',
          opacity: 1,
        },
      };
    } else {
      console.log('Type dont exist!');
    }

    options = {
      ...options,
    };

    console.log('change opacity 0');
    const canvas = document.getElementsByClassName('particles-canvas')[0];
    canvas.style.opacity = 0;
    setTimeout(() => {
      console.log('change opacity 1');
      canvas.style.opacity = 1;
      setOptions(options);
    }, 1000);
  }, [count, type]);

  // console.log(options);

  return (
    <Particles
      id={'particles'}
      // className={particlesClass}
      canvasClassName={'particles-canvas'}
      init={() => {
        // console.log('init');
      }}
      loaded={() => {
        // console.log('loaded');
      }}
      options={options}
      // params={rayasParticlesConfig}
    />
  );
};
