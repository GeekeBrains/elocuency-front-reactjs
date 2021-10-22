import GaugeChart from 'react-gauge-chart';

import {XYPlot, ArcSeries} from 'react-vis';

// import {EXTENDED_DISCRETE_COLOR_RANGE} from 'theme';

import {useEffect, useState} from 'react';

const PI = Math.PI;

function getSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

const DAILY_TARGET = 50;
export const Score = ({speed, countOk, wordNumberTarget, wordNumberOk}) => {
  const levelTargetArc = (Math.PI * wordNumberOk) / wordNumberTarget;
  const dailyTargetArc = (Math.PI * countOk) / DAILY_TARGET;
  const speedArc = (Math.PI * speed) / 4;

  console.log({
    wordNumberOk,
    wordNumberTarget,
    countOk,
    speed,
    levelTargetArc,
    dailyTargetArc,
    speedArc,
  });
  return (
    <div className="speedometer">
      <XYPlot
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={300}
        getAngle={d => d.time}
        getAngle0={d => 0}
        height={300}
      >
        <ArcSeries
          animation={{
            damping: 9,
            stiffness: 300,
          }}
          radiusDomain={[0, 3]}
          data={[
            {time: speedArc, radius0: 1, radius: 1.5, color: 0},
            {
              time: dailyTargetArc,
              radius0: 1.6,
              radius: 2.1,
              color: 1,
            },
            {
              time: levelTargetArc,
              radius0: 2.2,
              radius: 2.7,
              color: 2,
            },
          ]}
          colorRange={['#fff', 'pink', 'blue']}
        />
      </XYPlot>

      {/* <GaugeChart
        id="gauge-chart4"
        nrOfLevels={10}
        arcPadding={0.19}
        cornerRadius={3}
        hideText={true}
        // animate={false}
        percent={percent}
      />
      <div className="text">{countOk}</div> */}
      {/* <spam>{Math.round10(speed, -2)}/min</spam>
      <spam>{Math.round(timeUsed, -1)} s</spam> */}
    </div>
  );
};

// Conclusión
(function () {
  /**
   * Ajuste decimal de un número.
   *
   * @param {String}  tipo  El tipo de ajuste.
   * @param {Number}  valor El numero.
   * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
   * @returns {Number} El valor ajustado.
   */
  function decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function (value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function (value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function (value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

const data = [
  {
    id: '',
    data: [
      {
        x: 'Vegetables',
        y: 297,
      },
      {
        x: 'Fruits',
        y: 162,
      },
    ],
  },
  {
    id: '',
    data: [
      {
        x: 'Vegetables',
        y: 62,
      },
      {
        x: 'Fruits',
        y: 271,
      },
    ],
  },
];
