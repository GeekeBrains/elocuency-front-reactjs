import {ResponsiveRadialBar} from '@nivo/radial-bar';
import GaugeChart from 'react-gauge-chart';

export const Speedometer = ({speed, timeUsed, countOk}) => {
  const percent = speed * 0.1;
  return (
    <div className="speedometer">
      <ResponsiveRadialBar
        width={200}
        height={200}
        data={data}
        valueFormat=">-.2f"
        startAngle={-90}
        endAngle={90}
        innerRadius={0.6}
        padding={0.5}
        cornerRadius={21}
        margin={{top: 40, right: 120, bottom: 40, left: 40}}
        colors={{scheme: 'pastel2'}}
        borderColor={{from: 'color', modifiers: [['brighter', '0.8']]}}
        enableTracks={false}
        radialAxisStart={{tickSize: 5, tickPadding: 5, tickRotation: 0}}
        circularAxisOuter={{
          enable: false,
          tickSize: 0,
          tickPadding: 0,
          tickRotation: 0,
        }}
        motionConfig="stiff"
        radialAxisStart={{enable: false}}
        radialAxisEnd={{enable: false}}
        // legends={[
        //   {
        //     anchor: 'right',
        //     direction: 'row',
        //     justify: false,
        //     translateX: 33,
        //     translateY: 27,
        //     itemsSpacing: 6,
        //     itemDirection: 'left-to-right',
        //     itemWidth: 100,
        //     itemHeight: 30,
        //     itemTextColor: '#999',
        //     symbolSize: 18,
        //     symbolShape: 'square',
        //   },
        // ]}
      />
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
