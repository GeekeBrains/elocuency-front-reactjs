import { motion } from 'framer-motion';
import React from 'react';

export const ChatMsg = ({ msg, voiceSpanish, voiceEnglish }) => {
  // useEffect(() => {
  //   if (voiceSpanish) {
  //     const speechSynthesis = global.speechSynthesis;

  //     let mensaje = new global.SpeechSynthesisUtterance(msg.text);
  //     mensaje.voice = voiceSpanish;
  //     // mensaje.volume = 1;
  //     // mensaje.rate = 1;
  //     // mensaje.text = msg;
  //     // mensaje.pitch = 1;
  //     // mensaje.lang = 'en-US';
  //     // ¡Parla!
  //     global.speechSynthesis.speak(mensaje);
  //     console.log('Parla 2', voiceSpanish, msg.text);

  //     mensaje = new global.SpeechSynthesisUtterance(msg.text);
  //     mensaje.voice = voiceEnglish;
  //     // mensaje.volume = 1;
  //     // mensaje.rate = 1;
  //     // mensaje.text = msg;
  //     // mensaje.pitch = 1;
  //     mensaje.lang = 'en-US';
  //     // ¡Parla!
  //     global.speechSynthesis.speak(mensaje);
  //     console.log('Parla 2', voiceEnglish, msg.text);
  //   }
  // }, [msg, voiceSpanish, voiceEnglish]);

  return (
    <motion.div
      className="container"
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      style={{
        maxWidth: '80%',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        alignSelf: msg.userId?.substring(0, 3) === 'bot' ? 'flex-start' : 'flex-end',
        backgroundColor: msg.userId?.substring(0, 3) === 'bot' ? 'white' : '#9be69e',
        margin: 5,
        padding: 5,
        marginLeft: 24,
      }}
    >
      {msg.text}
    </motion.div>
  );
};
