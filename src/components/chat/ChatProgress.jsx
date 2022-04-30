import {motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import {
  XYPlot,
  ArcSeries,
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  ChartLabel,
  LineSeriesCanvas,
  Borders,
  VerticalBarSeries,
  LabelSeries,
  VerticalBarSeriesCanvas,
  HorizontalBarSeries,
} from 'react-vis';

const greenData = [
  {x: 'A', y: 10},
  {x: 'B', y: 5},
  {x: 'C', y: 15},
];

const blueData = [
  {x: 'A', y: 12},
  {x: 'B', y: 2},
  {x: 'C', y: 11},
];
const data2 = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
  {x: 9, y: 0},
];

const labelData = greenData.map((d, idx) => ({
  x: d.x,
  y: Math.max(greenData[idx].y, blueData[idx].y),
}));

const timestamp = new Date('May 23 2017').getTime();
const ONE_DAY = 86400000;
const style = 'chatMsg chatMsg-bot';
export const ChatProgress = ({msg}) => {
  const [data, setData] = useState({
    okWords: [],
    newWords: [],
    newWordsAcum: [],
    okWordsAcum: [],
    dayLabels: [],
  });

  useEffect(() => {
    const d = getData(msg.data);
    setData(d);
  }, [msg]);
  console.log('ChatProgress', JSON.parse(msg.data));
  return (
    <motion.div
      clasName={style}
      // style={{background: 'black'}}
      initial={{rotate: 180, scale: 0}}
      animate={{rotate: 0, scale: 1}}
      transition={{
        type: 'spring',
        stiffness: 560,
        damping: 20,
        duration: 1,
      }}
    >
      <XYPlot
        color="white"
        width={450}
        height={300}
        // xType="time"
        // xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
        // yDomain={[0.1, 2.1]}
        // colorType="linear"
        // colorDomain={[0, 1, 2]}
        // colorRange={('black', 'white', 'blue')}
        // style={{background: 'black'}}
      >
        <XAxis
          color="white"
          tickFormat={i => {
            console.log(data.dayLabels, i);
            return data.dayLabels[i];
          }}
          tickLabelAngle={-90}
        />
        <YAxis />
        {/* <VerticalBarSeries data={data.okWords} /> */}
        {/* <VerticalBarSeries data={data.newWords} /> */}
        {/* <LineSeries
          className="first-series"
          data={[
            {x: 1, y: 3},
            {x: 2, y: 5},
            {x: 3, y: 15},
            {x: 4, y: 12},
          ]}
          style={{
            strokeLinejoin: 'round',
            strokeWidth: 4,
          }}
        /> */}
        <LineSeries
          color="white"
          curve={'curveMonotoneX'}
          data={data.newWordsAcum}
          strokeDasharray="7, 3"
        />
        <LineSeries
          color="green"
          curve={'curveMonotoneX'}
          data={data.okWordsAcum}
          strokeDasharray="7, 3"
        />
        <VerticalBarSeries color="white" data={data.newWords} />
        <VerticalBarSeries color="green" data={data.okWords} />
        {/* <LabelSeries data={data.okWords} getLabel={d => d.label} /> */}
      </XYPlot>
    </motion.div>
  );
};

function getData(data) {
  data = JSON.parse(data);
  const ret = {
    okWords: [],
    newWords: [],
    dayLabels: [],
    newWordsAcum: [],
    okWordsAcum: [],
  };
  let i = 0;
  let newWordsAcum = 0;
  let okWordsAcum = 0;
  for (const r of data) {
    const date = new Date(r.date);
    const okWordsCount = r.okWordsCount;
    const newWordsCount = r.newWordsCount;
    okWordsAcum += okWordsCount;
    newWordsAcum += newWordsCount;
    ret.dayLabels.push(date.getDate() + '/' + (date.getMonth() + 1));
    ret.newWords.push({x: i, y: newWordsCount});
    ret.okWords.push({x: i, y: okWordsCount});
    ret.newWordsAcum.push({x: i, y: newWordsAcum});
    ret.okWordsAcum.push({x: i, y: okWordsAcum});
    ++i;
  }

  console.log(ret);
  return ret;
}
