/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import './App.css';
import { ChatMsgs } from './components/chat/ChatMsgs';
import { ChatInput } from 'components/chat/ChatInput';
import { apiPost } from './libs/ApiCall';

export function App() {
  const [msgs, setMsgs] = useState([]);
  const [voiceSpanish, setVoiceSpanish] = useState([]);
  const [voiceEnglish, setVoiceEnglish] = useState([]);

  // The first time
  useEffect(() => {
    apiPost(
      '/users/1/send-msg',
      { text: '' },
      {
        onResponse: (resp) => {
          const msgsClone = JSON.parse(JSON.stringify(msgs));
          resp.forEach((msgResp) => {
            msgsClone.push({ text: msgResp.text, userId: msgResp.userId });
          });
          setMsgs(msgsClone);
        },
        onError: () => {
          const msgsClone = JSON.parse(JSON.stringify(msgs));
          msgsClone.push({ text: 'Uff, no estoy conectado!!', userId: 'bot1' });
          setMsgs(msgsClone);
        },
      },
    );
  }, []);

  // Carga voces --------------------------
  if ('onvoiceschanged' in global.speechSynthesis) {
    global.speechSynthesis.onvoiceschanged = function () {
      let vocesDisponibles = global.speechSynthesis.getVoices();
      vocesDisponibles.forEach((voz) => {
        // console.log('VOZ', voz);
        if (voz.name === 'Google español') {
          console.log('----', voz);
          setVoiceSpanish(voz);
        }
        if (voz.name === 'Google UK English Female') {
          console.log('----', voz);
          setVoiceEnglish(voz);
        }
      });
    };
  }

  // Render ------------------------------------
  return (
    <>
      <ChatMsgs msgs={msgs} voiceSpanish={voiceSpanish} voiceEnglish={voiceEnglish} />
      <ChatInput
        onAdd={async (text, speechRecognitionResults) => {
          const resp = await apiPost('/chats/1/msgs', {
            text,
            userId: 'joshua',
            speechRecognitionResults,
          });
          if (resp.data) {
            const msgsClone = JSON.parse(JSON.stringify(msgs));
            msgsClone.push({ text, userId: 'user1' });
            resp.data.forEach((msgResp) => {
              console.log({ msgResp });
              msgsClone.push({ text: msgResp.text, userId: msgResp.userId, chatId: '1' });
              // Habla ---------------------
              if (!!!msgResp.voice?.mute) {
                let mensaje = new global.SpeechSynthesisUtterance(msgResp.text);
                if (msgResp.userId === 'botSpanish') {
                  mensaje.voice = voiceSpanish;
                  mensaje.lang = 'es-ES';
                } else if (msgResp.userId === 'botEnglish') {
                  mensaje.voice = voiceEnglish;
                  mensaje.lang = 'en-GB';
                }
                console.log(mensaje);
                mensaje.rate = msgResp.voice?.rate || 1;
                // mensaje.volume = 1;
                // mensaje.pitch = 1;
                global.speechSynthesis.speak(mensaje);
                // mensaje.text = msg;
                // mensaje.pitch = 1;
                // mensaje.lang = 'en-US';
              }

              var element = global.document.getElementById('chatView');
              element.scrollTop = element.scrollHeight;
            });
            setMsgs(msgsClone);
          }
        }}
      />
    </>
  );
}
