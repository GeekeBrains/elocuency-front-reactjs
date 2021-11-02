import {motion} from 'framer-motion';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export const ChatMarkdown = ({text}) => {
  return (
    <motion.div
      className="chatMarkdown"
      initial={{rotate: 180, scale: 0}}
      animate={{rotate: 0, scale: 1}}
      transition={{
        type: 'spring',
        stiffness: 560,
        damping: 20,
        duration: 1,
      }}
    >
      <ReactMarkdown children={text} />
      {/* <ReactMarkdown
        children={
          '# Información del usuario  \n ppp  \n skdjfh  \n sdf <br /> **Nombre:** undefined  \n **email:** teo.carballo.villar@gmail.com '
        }
      /> */}
    </motion.div>
  );
};
