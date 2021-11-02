import {motion} from 'framer-motion';
import React from 'react';

export const ChatMsg = ({
  msg,
  //voiceSpanish, voiceEnglish
}) => {
  const style =
    'chatMsg chatMsg-' +
    (msg.userId?.substring(0, 3) === 'bot' ? 'bot' : 'user');
  return (
    <motion.div
      className={style}
      initial={{scale: 0}}
      animate={{rotate: 360, scale: 1}}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {msg.text}
    </motion.div>
  );
};
