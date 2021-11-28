import {motion} from 'framer-motion';
import React from 'react';

export const ChatButton = ({msg}) => {
  return (
    <motion.div
      className="chatButton"
      initial={{rotate: 180, scale: 0}}
      animate={{rotate: 0, scale: 1}}
      transition={{
        type: 'spring',
        stiffness: 560,
        damping: 20,
        duration: 1,
      }}
      onClick={() => {
        msg?.commandFunc && msg.commandFunc();
      }}
    >
      {msg.text}
    </motion.div>
  );
};
