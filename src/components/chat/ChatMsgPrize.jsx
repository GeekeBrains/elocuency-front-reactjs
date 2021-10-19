import {motion} from 'framer-motion';
import React from 'react';

export const ChatMsgPrize = ({msg}) => {
  return (
    <motion.div
      className="container"
      initial={{rotate: 180, scale: 0}}
      animate={{rotate: 0, scale: 1}}
      transition={{
        type: 'spring',
        stiffness: 560,
        damping: 20,
        duration: 1,
      }}
      style={{
        maxWidth: '100%',
        borderRadius: 100,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#94979994',
        backgroundColor: '#6ecb34',
        margin: 5,
        padding: 5,
        marginLeft: 24,
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
