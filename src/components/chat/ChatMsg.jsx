import {motion} from 'framer-motion';
import React from 'react';

export const ChatMsg = ({
  msg,
  //voiceSpanish, voiceEnglish
}) => {
  const style =
    'chatMsg chatMsg-' +
    (msg.userId?.substring(0, 3) === 'bot' ? 'bot' : 'user');

  let outputText = msg.text;
  if (msg.hideText) {
    outputText = '📣';
  }
  return (
    <motion.div
      className={style}
      style={{
        fontSize: msg.hideText ? 30 : 15,
        backgroundColor:
          msg.userId === 'botEnglish' ? '#b1e9ff9c' : '#fffdecc7',
      }}
      initial={{scale: 0}}
      animate={{rotate: 360, scale: 1}}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      onClick={() => {
        let ssu = new global.SpeechSynthesisUtterance(msg.text);
        if (ssu) {
          if (msg.userId === 'botSpanish' || msg.userId === 'botPrize') {
            ssu.voice = global.elocuency.voiceSpanish;
            ssu.lang = 'es-ES';
          } else if (msg.userId === 'botEnglish') {
            ssu.voice = global.elocuency.voiceEnglish;
            ssu.lang = 'en-GB';
          }
          ssu.rate = msg.voice?.rate || 1;
          global.speechSynthesis.speak(ssu);
        }
      }}
    >
      {outputText}
    </motion.div>
  );
};
