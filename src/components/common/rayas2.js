const op = {
  autoPlay: true,
  background: {
    color: {
      value: '#ffffff',
    },
    image: "url('https://particles.js.org/images/background3.jpg')",
    position: '50% 50%',
    repeat: 'no-repeat',
    size: 'cover',
    opacity: 1,
  },
  backgroundMask: {
    composite: 'destination-out',
    cover: {
      color: {
        value: {
          r: 255,
          g: 255,
          b: 255,
        },
      },
      opacity: 1,
    },
    enable: true,
  },
  fullScreen: {
    enable: true,
    zIndex: 1,
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onDiv: {
        selectors: [],
        enable: false,
        mode: [],
        type: 'circle',
      },
      onHover: {
        enable: true,
        mode: 'bubble',
        parallax: {
          enable: false,
          force: 60,
          smooth: 10,
        },
      },
      resize: true,
    },
    modes: {
      attract: {
        distance: 200,
        duration: 0.4,
        easing: 'ease-out-quad',
        factor: 1,
        maxSpeed: 50,
        speed: 1,
      },
      bounce: {
        distance: 200,
      },
      bubble: {
        distance: 400,
        duration: 2,
        mix: false,
        opacity: 1,
        size: 100,
      },
      connect: {
        distance: 80,
        links: {
          opacity: 0.5,
        },
        radius: 60,
      },
      grab: {
        distance: 400,
        links: {
          blink: false,
          consent: false,
          opacity: 1,
        },
      },
      light: {
        area: {
          gradient: {
            start: {
              value: '#ffffff',
            },
            stop: {
              value: '#000000',
            },
          },
          radius: 1000,
        },
        shadow: {
          color: {
            value: '#000000',
          },
          length: 2000,
        },
      },
      push: {
        default: true,
        groups: [],
        quantity: 1,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
        factor: 100,
        speed: 40,
        maxSpeed: 50,
        easing: 'ease-out-quad',
      },
      slow: {
        factor: 1,
        radius: 200,
      },
      trail: {
        delay: 1,
        pauseOnStop: false,
        quantity: 1,
      },
    },
  },
  manualParticles: [],
  motion: {
    disable: false,
    reduce: {
      factor: 4,
      value: true,
    },
  },
  particles: {
    bounce: {
      horizontal: {
        random: {
          enable: false,
          minimumValue: 0.5,
        },
        value: 10,
      },
      vertical: {
        random: {
          enable: false,
          minimumValue: 1,
        },
        value: 1,
      },
    },
    collisions: {
      bounce: {
        horizontal: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
        vertical: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
      },
      enable: false,
      mode: 'bounce',
      overlap: {
        enable: true,
        retries: 0,
      },
    },
    color: {
      value: '#ffffff',
      animation: {
        h: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 10,
          sync: true,
        },
        s: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 10,
          sync: true,
        },
        l: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 1,
          sync: true,
        },
      },
    },
    destroy: {
      mode: 'none',
      split: {
        count: 1,
        factor: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 3,
        },
        rate: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: {
            min: 1,
            max: 2,
          },
        },
        sizeOffset: true,
      },
    },
    gradient: [],
    groups: {},
    life: {
      count: 0,
      delay: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        sync: false,
      },
      duration: {
        random: {
          enable: false,
          minimumValue: 0.0001,
        },
        value: 0,
        sync: false,
      },
    },
    links: {
      blink: false,
      color: {
        value: '#ffffff',
      },
      consent: false,
      distance: 100, // distancia part
      enable: true,
      frequency: 1,
      opacity: 1,
      shadow: {
        blur: 5,
        color: {
          value: '#00ff00',
        },
        enable: false,
      },
      triangles: {
        enable: false,
        frequency: 1,
      },
      width: 1,
      warp: true,
    },
    move: {
      angle: {
        offset: 0,
        value: 10,
      },
      attract: {
        distance: 200,
        enable: false,
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      decay: 0,
      distance: {},
      direction: 'none',
      drift: 0,
      enable: true,
      gravity: {
        acceleration: 29.81,
        enable: false,
        inverse: false,
        maxSpeed: 50,
      },
      path: {
        clamp: true,
        delay: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
        },
        enable: false,
        options: {},
      },
      outModes: {
        default: 'out',
        bottom: 'out',
        left: 'out',
        right: 'out',
        top: 'out',
      },
      random: false,
      size: false,
      speed: 1, // Velocidad parts
      spin: {
        acceleration: 0,
        enable: false,
      },
      straight: false,
      trail: {
        enable: false,
        length: 10,
        fillColor: {
          value: '#000001',
        },
      },
      vibrate: false, // Pequeña vibracion de parts
      warp: true,
    },
    number: {
      density: {
        enable: true,
        area: 800,
        factor: 1000,
      },
      limit: 0,
      value: count, // Num particulas
    },
    opacity: {
      random: {
        enable: true,
        minimumValue: 0.1,
      },
      value: 10,
      animation: {
        count: 10,
        enable: true,
        speed: 10, // Velocidad cambio opacidad particulas
        sync: false,
        destroy: 'true',
        startValue: 'random',
        minimumValue: 0.1,
      },
    },
    orbit: {
      animation: {
        count: 10,
        enable: false,
        speed: 1,
        sync: false,
      },
      enable: true,
      opacity: 1,
      rotation: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 45,
      },
      width: 1,
    },
    reduceDuplicates: true,
    repulse: {
      random: {
        enable: false,
        minimumValue: 0,
      },
      value: 100,
      enabled: true,
      distance: 1,
      duration: 1,
      factor: 1,
      speed: 10,
    },
    roll: {
      darken: {
        enable: true,
        value: 0,
      },
      enable: false, // Giro de la paridcula como en 3D
      enlighten: {
        enable: false,
        value: 0,
      },
      mode: 'vertical',
      speed: 25,
    },
    rotate: {
      random: {
        enable: false,
        minimumValue: 0,
      },
      value: 0,
      animation: {
        enable: false,
        speed: 0,
        sync: false,
      },
      direction: 'clockwise',
      path: false,
    },
    shadow: {
      blur: 0,
      color: {
        value: '#000001',
      },
      enable: false, // Sombra
      offset: {
        x: 10,
        y: 10,
      },
    },
    shape: {
      options: {},
      type: 'circle',
    },
    size: {
      random: {
        enable: true,
        minimumValue: 5,
      },
      value: {
        min: 1,
        max: 30,
      },
      animation: {
        count: 0,
        enable: false,
        speed: 10,
        sync: false,
        destroy: 'none',
        startValue: 'random',
        minimumValue: 0.1,
      },
    },
    stroke: {
      width: 12, // Circulo alrededor
    },
    tilt: {
      // Inclinación de la part
      random: {
        enable: false,
        minimumValue: 0,
      },
      value: 10,
      animation: {
        enable: true,
        speed: 0,
        sync: false,
      },
      direction: 'clockwise',
      enable: false,
    },
    twinkle: {
      lines: {
        enable: false,
        frequency: 0.05,
        opacity: 1,
      },
      particles: {
        enable: false,
        frequency: 0.05,
        opacity: 1,
      },
    },
    wobble: {
      // Movimiento ondulatorio
      distance: 5,
      enable: false,
      speed: 50,
    },
    zIndex: {
      random: {
        enable: false,
        minimumValue: 0,
      },
      value: 0,
      opacityRate: 1,
      sizeRate: 1,
      velocityRate: 1,
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  responsive: [],
  themes: [],
  zLayers: 100,
};
