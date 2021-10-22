/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';

import './App.css';
import {ChatMsgs} from './components/chat/ChatMsgs';
import {ChatInput} from 'components/chat/ChatInput';
import {apiPost} from './libs/ApiCall';
import {Background} from 'components/common/Background';
import {Login} from 'components/Login';
import {ScoreOld} from 'components/ScoreOld';
import {playEmotion} from 'libs/Sound';
import {Score} from 'components/Score';
import {calculateBounds} from 'tsparticles';

const DIVISIBLE_TO_PRIZE = 5;
const WAIT_SORT = 800;
const WAIT_LONG = 4000;
let calculatingSpeed = false;

export function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) ?? {userId: ''},
  );
  const [chatId, setChatId] = useState(
    JSON.parse(localStorage.getItem('chatId')) ?? 1,
  );
  const [msgs, setMsgs] = useState([]);
  const [voiceSpanish, setVoiceSpanish] = useState([]);
  const [voiceEnglish, setVoiceEnglish] = useState([]);
  const [countOk, setCountOk] = useState(0);
  const [wordNumberTarget, setWordNumberTarget] = useState(0);
  const [wordNumberOk, setWordNumberOk] = useState(0);
  const [background, setBackground] = useState('balls');
  const [startTime, setStartTime] = useState(new Date());
  // const [speed, setSpeed] = useState(0);
  // const [timeUsed, setTimeUsed] = useState(0);

  // The first time
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    apiPost(
      '/users/' + user?.id + '/send-msg',
      {text: ''},
      {
        onResponse: resp => {
          console.log('sdf>>>wewerwe');
          const msgsClone = JSON.parse(JSON.stringify(msgs));
          resp.forEach(msgResp => {
            console.log('sdf>>>', msgResp);
            msgsClone.push({text: msgResp.text, userId: msgResp.userId});
          });
          setMsgs(msgsClone);
        },
        onError: () => {
          const msgsClone = JSON.parse(JSON.stringify(msgs));
          msgsClone.push({text: 'Uff, no estoy conectado!!', userId: 'bot1'});
          setMsgs(msgsClone);
        },
      },
    );

    // Carga voces --------------------------
    if ('onvoiceschanged' in global.speechSynthesis) {
      global.speechSynthesis.onvoiceschanged = function () {
        let vocesDisponibles = global.speechSynthesis.getVoices();
        vocesDisponibles.forEach(voz => {
          // console.log('VOZ', voz);
          if (voz.name === 'Google español') {
            // console.log('----', voz);
            setVoiceSpanish(voz);
          }
          if (voz.name === 'Google UK English Female') {
            // console.log('----', voz);
            setVoiceEnglish(voz);
          }
        });
      };
    }

    // setInterval(() => {
    //   console.log('app', background);
    //   if (background === 'balls') {
    //     console.log('app set confeti');
    //     setBackground('confeti');
    //   } else {
    //     console.log('app set ball');
    //     setBackground('balls');
    //   }
    // }, 10000);

    // Speed
    // const interval = setInterval(() => {
    //   // console.log('speed', localCountOk, min, wordNumberOk / min);
    // }, 1000);

    // return () => clearInterval(interval);
  }, []);

  const endTime = new Date();
  var min = (endTime.getTime() - startTime.getTime()) / 1000 / 60;
  const speed = countOk / min;

  // Render ------------------------------------
  return (
    <>
      {!user?.id ? (
        <Login
          onChange={user => {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          }}
        />
      ) : (
        <>
          <Background count={countOk / DIVISIBLE_TO_PRIZE} type={background} />
          <div id="board">
            <ChatMsgs
              msgs={msgs}
              voiceSpanish={voiceSpanish}
              voiceEnglish={voiceEnglish}
            />
            <Score
              speed={speed}
              countOk={countOk}
              wordNumberTarget={wordNumberTarget}
              wordNumberOk={wordNumberOk}
            />

            <footer
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                position: 'absolute',
                bottom: 10,
                left: 0,
                height: 50,
                justifyContent: 'center',
              }}
            >
              <ChatInput
                onAdd={async (text, speechRecognitionResults) => {
                  let waitAMoment = WAIT_SORT;
                  const resp = await apiPost('/chats/' + chatId + '/msgs', {
                    text,
                    userId: user.id,
                    speechRecognitionResults,
                  });
                  if (resp.data) {
                    const msgsClone = JSON.parse(JSON.stringify(msgs));
                    msgsClone.push({text, userId: user.id});
                    resp.data.forEach(msgResp => {
                      if (msgResp.wordNumberTarget) {
                        setWordNumberTarget(msgResp.wordNumberTarget);
                        setWordNumberOk(msgResp.wordNumberOk);
                      }

                      if (msgResp.emotionalResponse === 'ok') {
                        const nextCountOk = countOk + 1;
                        setCountOk(nextCountOk);
                        if (
                          nextCountOk > 0 &&
                          nextCountOk % DIVISIBLE_TO_PRIZE === 0
                        ) {
                          msgsClone.push({
                            text: msgResp.text,
                            userId: 'prize',
                            chatId: chatId,
                            prize: nextCountOk,
                          });
                          playEmotion('ok3');
                          waitAMoment = WAIT_LONG;
                          setMsgs(JSON.parse(JSON.stringify(msgsClone)));
                          setBackground('confeti');
                        } else {
                          playEmotion('ok1');
                        }
                      } else if (msgResp.emotionalResponse === 'ko') {
                        playEmotion('ko1');
                      }

                      // console.log({msgResp});
                      msgsClone.push({
                        text: msgResp.text,
                        userId: msgResp.userId,
                        chatId: chatId,
                      });
                      setTimeout(() => {
                        // Habla ---------------------
                        if (
                          voiceSpanish &&
                          voiceEnglish &&
                          !msgResp.voice?.mute
                        ) {
                          let mensaje = new global.SpeechSynthesisUtterance(
                            msgResp.text,
                          );
                          if (msgResp.userId === 'botSpanish') {
                            mensaje.voice = voiceSpanish;
                            mensaje.lang = 'es-ES';
                          } else if (msgResp.userId === 'botEnglish') {
                            mensaje.voice = voiceEnglish;
                            mensaje.lang = 'en-GB';
                          }
                          // console.log(mensaje);
                          mensaje.rate = msgResp.voice?.rate || 1;
                          // mensaje.volume = 1;
                          // mensaje.pitch = 1;
                          global.speechSynthesis.speak(mensaje);
                          // mensaje.text = msg;
                          // mensaje.pitch = 1;
                          // mensaje.lang = 'en-US';
                        }
                      }, waitAMoment);
                    });
                    setTimeout(() => {
                      console.log('Refres msgClone');
                      setMsgs(msgsClone);
                      setBackground('balls');
                    }, waitAMoment + 1000);
                  }
                }}
              />
            </footer>
          </div>
        </>
      )}
    </>
  );
}
