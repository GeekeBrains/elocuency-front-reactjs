import {motion} from 'framer-motion';
import React from 'react';

export const ChatButton = ({msg, onAdd}) => {
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
        console.log('onClick', msg.commandExec);
        if (msg?.commandExec) {
          onAdd('#' + msg.commandExec);
        }
      }}
    >
      {msg.text}
    </motion.div>
  );
};
