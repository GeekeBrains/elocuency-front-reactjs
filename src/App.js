/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';

import './App.css';
import {ChatMsgs} from './components/chat/ChatMsgs';
import {ChatInput} from 'components/chat/ChatInput';
import {apiPost} from './libs/ApiCall';
import {Background} from 'components/common/Background';
import {Login} from 'components/Login';
import {Score} from 'components/Score';

const DIVISIBLE_TO_PRIZE = 5;

export function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) ?? {userId: ''},
  );
  const [chatId /*, setChatId*/] = useState(
    JSON.parse(localStorage.getItem('chatId')) ?? 1,
  );
  const [msgs, setMsgs] = useState([]);
  const [msgsAux, setMsgsAux] = useState([]);
  const [countOk, setCountOk] = useState(0);
  const [wordNumberTarget, setWordNumberTarget] = useState(0);
  const [wordNumberOk, setWordNumberOk] = useState(0);
  const [background, setBackground] = useState('balls');
  const [startTime, setStartTime] = useState(new Date());
  const [voiceSpanish, setVoiceSpanish] = useState(null);
  const [voiceEnglish, setVoiceEnglish] = useState(null);
  // const [timeUsed, setTimeUsed] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  const scoreRef = useRef(null);

  /* The first time */
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

    /* Carga voces */
    if ('onvoiceschanged' in global.speechSynthesis) {
      console.log('Hay onvoiceschanged');
      global.speechSynthesis.onvoiceschanged = function () {
        console.log('On onvoiceschanged');
        let vocesDisponibles = global.speechSynthesis.getVoices();
        vocesDisponibles.forEach(voz => {
          if (voz.name === 'Google español') {
            console.log(voz.name);
            setVoiceSpanish(voz);
          }
          if (voz.name === 'Google UK English Female') {
            console.log(voz.name);
            setVoiceEnglish(voz);
          }
        });
      };
    } else {
      console.error('ERROR, onvoiceschanged no loaded');
    }
  }, []);

  /* OnChange msgIndex */
  useEffect(() => {
    console.log('msgsAux change');
    nextIndex();
  }, [msgsAux]);

  /* OnChange msgIndex */
  useEffect(() => {
    const activeMsg = msgsAux[msgIndex];
    console.log('on Change msgIndex', {activeMsg, msgIndex, msgs});
    setMsgs(msgsAux.slice(0, msgIndex + 1));
    speak(activeMsg);
  }, [msgIndex]);

  /* setMsgIndex function */
  function nextIndex() {
    setMsgIndex(currentIndex => {
      // console.log('nexIndex', currentIndex, msgs.length, msgs);
      if (currentIndex < msgsAux.length - 1) {
        // console.log('nexIndex ok ', currentIndex + 1);
        return currentIndex + 1;
      } else {
        // console.log('nexIndex ko ', currentIndex);
        return currentIndex;
      }
    });
  }

  /* playEmotion */
  function playEmotion(emotion, callback) {
    const max = 6; // Not include
    const min = 1; // Inlcuded
    const rand = Math.floor(Math.random() * (max - min) + min);
    const soundFile = 'audio/' + emotion + '/' + rand + '.mp3';
    console.log(soundFile);
    var audio = new Audio(soundFile);
    if (emotion == 'ok3') {
      setBackground('confeti');
    }
    audio.play();
    audio.addEventListener('loadeddata', () => {
      console.log('Terminó el audio');
      if (background === 'confeti') {
        setBackground('balls');
      }
      callback();
    });
  }

  /* Speak */
  function speak(msgResp) {
    if (!msgResp) return;

    console.log('SPEAK', msgResp);
    if (msgResp.userId.slice(0, 3) !== 'bot') {
      console.log('speak not a bot', msgResp.userId.slice(-3));
      nextIndex();
      return;
    }

    if (msgResp.emotion) {
      /* Emotional sound */
      console.log('emotion', msgResp.emotion);
      playEmotion(msgResp.emotion, () => {
        console.log('nextIndex end playemotion');
        msgResp.emotion = null;
        speak(msgResp);
      });
    } else {
      /* Speak */
      if (msgResp && voiceSpanish && voiceEnglish && !msgResp.voice?.mute) {
        let ssu = new global.SpeechSynthesisUtterance(msgResp.text);
        if (ssu) {
          if (
            msgResp.userId === 'botSpanish' ||
            msgResp.userId === 'botPrize'
          ) {
            ssu.voice = voiceSpanish;
            ssu.lang = 'es-ES';
          } else if (msgResp.userId === 'botEnglish') {
            ssu.voice = voiceEnglish;
            ssu.lang = 'en-GB';
          }
          ssu.rate = msgResp.voice?.rate || 1;

          global.speechSynthesis.speak(ssu);

          /* On End of speak */
          ssu.onend = function () {
            console.log('nextIndex on end Speak');
            nextIndex();
          };
        } else {
          console.error('ERROR Load mensage');
        }
      } else {
        console.error({msgResp, voiceSpanish, voiceEnglish});
      }
    }
  }
  const endTime = new Date();

  var min = (endTime.getTime() - startTime.getTime()) / 1000 / 60;
  const speed = countOk / min;

  /* processesUserResponse */
  async function processesUserResponse(userText) {
    scoreRef.current.resetTime();
    const resp = await apiPost('/chats/' + chatId + '/msgs', {
      text: userText,
      userId: user.id,
      // speechRecognitionResults,
    });
    if (resp.data) {
      const msgsClone = JSON.parse(JSON.stringify(msgs));
      msgsClone.push({text: userText, userId: user.id});
      for (const msgResp of resp.data) {
        const msg = {
          text: msgResp.text,
          userId: msgResp.userId,
          chatId: chatId,
        };

        if (msgResp.wordNumberTarget) {
          setWordNumberTarget(msgResp.wordNumberTarget);
          setWordNumberOk(msgResp.wordNumberOk);
        }

        if (msgResp.emotionalResponse === 'ok') {
          const nextCountOk = countOk + 1;
          msgsClone.push({
            userId: 'botEnglish',
            text: userText,
          });
          setCountOk(nextCountOk);
          if (nextCountOk > 0 && nextCountOk % DIVISIBLE_TO_PRIZE === 0) {
            msg.userId = 'botPrize';
            msg.prize = nextCountOk;
            msg.emotion = 'ok3';
          } else {
            msg.emotion = 'ok1';
          }
        } else if (msgResp.emotionalResponse === 'ko') {
          msg.emotion = 'ko1';
        }
        msgsClone.push(msg);
      }

      setMsgsAux(msgsClone);
    }
  }

  // console.log({msgs});
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
              // time={timeUsed}
              wordNumberTarget={wordNumberTarget}
              wordNumberOk={wordNumberOk}
              endTimeEvent={() => {
                processesUserResponse('?');
              }}
              ref={scoreRef}
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
                user={user.email}
                onAdd={text => processesUserResponse(text)}
              />
            </footer>
          </div>
        </>
      )}
    </>
  );
}
