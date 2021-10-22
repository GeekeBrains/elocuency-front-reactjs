import {motion} from 'framer-motion';
import React from 'react';

export const ChatMsgPrize = ({msg}) => {
  return (
    <motion.div
      className="chatMsgPrize"
      initial={{rotate: 180, scale: 0}}
      animate={{rotate: 0, scale: 1}}
      transition={{
        type: 'spring',
        stiffness: 560,
        damping: 20,
        duration: 1,
      }}
    >
      <span
        style={{
          fontSize: 150,
        }}
      >
        {msg.prize}
      </span>
    </motion.div>
  );
};
