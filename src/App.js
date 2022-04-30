/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';

import './App.css';
import {ChatMsgs} from './components/chat/ChatMsgs';
import {ChatInput} from 'components/chat/ChatInput';
import {apiCall, apiPost} from './libs/ApiCall';
import {Background} from 'components/common/Background';
import {Login} from 'components/Login';
import {Score} from 'components/Score';
import ClipLoader from 'react-spinners/ClipLoader';
import {ClimbingBoxLoader, PacmanLoader} from 'react-spinners';

const DIVISIBLE_TO_PRIZE = 5;

if (!global.elocuency) {
  global.elocuency = {};
}

export function App() {
  const [user, setUser] = useState('');
  const [chatId, setChatId] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [msgsAux, setMsgsAux] = useState([]);
  const [msgIndex, setMsgIndex] = useState(0);

  const [globalCountOk, setGlobalCountOk] = useState(0);
  const [wordNumberTarget, setWordNumberTarget] = useState(0);
  const [wordNumberOk, setWordNumberOk] = useState(0);
  const [startTime /*setStartTime*/] = useState(new Date());

  const [activeTimer, setActiveTimer] = useState(false);
  const [background, setBackground] = useState('balls');
  const [waiting, setWaiting] = useState(false);

  // const [voiceSpanish, setVoiceSpanish] = useState(null);
  // const [voiceEnglish, setVoiceEnglish] = useState(null);
  // const [timeUsed, setTimeUsed] = useState(0);

  const scoreRef = useRef(null);

  /* Init App */
  useEffect(() => {
    if (localStorage.getItem('chatId')) {
      setChatId(localStorage.getItem('chatId') ?? '');
    } else {
      (async () => {
        const resp = await apiPost('/chats', {});
        console.log(resp);
        setChatId(resp.data.id);
        localStorage.setItem('chatId', resp.data.id);
      })();
    }
    setUser(JSON.parse(localStorage.getItem('user')) ?? {});

    /* Load voices */
    if ('onvoiceschanged' in global.speechSynthesis) {
      console.log('Hay onvoiceschanged');
      global.speechSynthesis.onvoiceschanged = function () {
        console.log('On onvoiceschanged');
        let vocesDisponibles = global.speechSynthesis.getVoices();
        let defaultEs = null;
        let googleEs = null;
        let defaultEn = null;
        let googleEn = null;
        vocesDisponibles.forEach(voz => {
          console.log('Voz: ', voz);
          if (voz.name === 'Google español') {
            googleEs = voz;
          }
          if (voz.name === 'Google UK English Female') {
            googleEn = voz;
          }
          if (voz.lang === 'es-ES') {
            defaultEs = voz;
          }
          if (voz.lang === 'en-GB') {
            defaultEn = voz;
          }
        });
        global.elocuency.voiceEnglish = googleEn ?? defaultEn;
        global.elocuency.voiceSpanish = googleEs ?? defaultEs;
        console.log('en', global.elocuency.voiceEnglish);
        console.log('es', global.elocuency.voiceSpanish);
      };
    } else {
      console.error('ERROR, onvoiceschanged no loaded');
    }
  }, []);

  /* OnChange user */
  useEffect(() => {
    processesUserResponse('?');
  }, [user]);

  /* OnChange msgsAux */
  useEffect(() => {
    console.log('msgsAux change');
    nextIndex();
  }, [msgsAux]);

  /* OnChange msgIndex */
  useEffect(() => {
    const activeMsg = msgsAux[msgIndex];
    console.log('on Change msgIndex', {activeMsg, msgIndex, msgs});
    setMsgs(msgsAux.slice(0, msgIndex + 1));
    if (activeMsg) {
      if (activeMsg.type === 'text') {
        speak(activeMsg);
      } else {
        nextIndex();
      }
    }
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
    console.log('PLAY EMOTION', soundFile);
    var audio = new Audio(soundFile);
    if (emotion == 'ok3') {
      setBackground('confeti');
    }
    audio.play();
    audio.addEventListener('loadeddata', () => {
      console.log('PLAY EMOTION END');
      if (background === 'confeti') {
        setBackground('balls');
      }
      callback();
    });
  }

  /* Speak */
  function speak(msgResp) {
    if (!msgResp) return;

    console.log('SPEAK ' + msgResp.text, msgResp);
    if (msgResp.userId.slice(0, 3) !== 'bot') {
      console.log('   speak not a bot', msgResp.userId.slice(-3));
      nextIndex();
      return;
    }

    if (msgResp.emotion) {
      /* Emotional sound */
      playEmotion(msgResp.emotion, () => {
        msgResp.emotion = null;
        console.log('  callBack playEmotion()');
        speak(msgResp);
        return;
      });
    } else {
      /* Speak */
      if (
        msgResp &&
        global.elocuency.voiceSpanish &&
        global.elocuency.voiceEnglish &&
        !msgResp.voice?.mute
      ) {
        let ssu = new global.SpeechSynthesisUtterance(msgResp.text);
        if (ssu) {
          if (
            msgResp.userId === 'botSpanish' ||
            msgResp.userId === 'botPrize'
          ) {
            ssu.voice = global.elocuency.voiceSpanish;
            ssu.lang = 'es-ES';
          } else if (msgResp.userId === 'botEnglish') {
            ssu.voice = global.elocuency.voiceEnglish;
            ssu.lang = 'en-GB';
          }
          ssu.rate = msgResp.voice?.rate || 1;

          global.speechSynthesis.speak(ssu);

          /* On End of speak */
          ssu.onend = function () {
            console.log('  SPEAK nextIndex on end of: ' + msgResp.text);
            nextIndex();
          };
        } else {
          console.error('SPEAK ERROR Load mensage');
        }
      } else {
        if (!msgResp.voice?.mute) {
          console.log('SPEAK mute');
        } else {
          console.error('SPEAK ERROR');
        }
        nextIndex();
      }
    }
  }

  /* Processes User Response */
  async function processesUserResponse(userText) {
    if (!chatId) {
      console.error('chatId null!!');
      return;
    }
    setWaiting(true);

    scoreRef?.current?.resetTime();
    const resp = await apiPost('/chats/' + chatId + '/msgs', {
      text: userText,
      userId: user.id,
      langId: 'es',
      type: 'text',
      // speechRecognitionResults,
    });
    if (resp.data) {
      const msgsClone = JSON.parse(JSON.stringify(msgs));
      msgsClone.push({text: userText, userId: user.id});
      for (const msgResp of resp.data) {
        const msg = msgResp;
        /* Active timer? */
        if (msgResp.wordNumberTarget) {
          setActiveTimer(true);
          setWordNumberTarget(msgResp.wordNumberTarget);
          setWordNumberOk(msgResp.wordNumberOk);
        } else {
          setActiveTimer(false);
          setWordNumberTarget(0);
          setWordNumberOk(0);
        }

        if (msgResp.emotionalResponse === 'ok') {
          /* Response Ok */
          const nextGlobalCountOk = globalCountOk + 1;
          setGlobalCountOk(nextGlobalCountOk);
          if (
            nextGlobalCountOk > 0 &&
            nextGlobalCountOk % DIVISIBLE_TO_PRIZE === 0
          ) {
            /* Bonus */
            msg.userId = 'botPrize';
            msg.prize = nextGlobalCountOk;
            msg.emotion = 'ok3';
          } else {
            msg.emotion = 'ok1';
          }
        } else if (msgResp.emotionalResponse === 'ko') {
          /* Emotional Ko */
          msg.emotion = 'ko1';
        } else {
          /* No emotional! */
        }

        /* Close session? */
        if (msgResp.command === 'session.close') {
          msgResp.commandFunc = commandSessionClose;
        }

        msgsClone.push(msg);
      }

      console.log('msgs', {msgs, msgsClone});
      setMsgsAux(msgsClone);
      setWaiting(false);
    }
  }

  /* commandSessionClose */
  function commandSessionClose() {
    setUser({});
  }

  const endTime = new Date();

  var min = (endTime.getTime() - startTime.getTime()) / 1000 / 60;
  const speed = globalCountOk / min;
  // console.log({msgs});

  // Render ------------------------------------
  return (
    <>
      {!user?.id ? (
        <Login
          onChange={user => {
            console.log({user});
            setMsgsAux([]);
            setMsgs([]);
            setMsgIndex(0);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            localStorage.setItem('chatId', user.chatId);
            setChatId(user.chatId);
          }}
        />
      ) : (
        <>
          {/* <Background
            count={globalCountOk / DIVISIBLE_TO_PRIZE}
            type={background}
          /> */}
          <div id="board">
            {waiting ? (
              <PacmanLoader
                color={'#ffffff'}
                loading={waiting}
                css={{
                  position: 'absolute',
                  top: '50%',
                  left: 'calc(50% - 75px)',
                }}
                size={50}
              />
            ) : (
              <></>
            )}
            <ChatMsgs
              msgs={msgs}
              onAdd={text => processesUserResponse(text)}
              waiting={waiting}
              // voiceSpanish={voiceSpanish}
              // voiceEnglish={voiceEnglish}
            />
            <Score
              activeTimer={activeTimer}
              speed={speed}
              wordNumberOk={wordNumberOk}
              wordNumberTarget={wordNumberTarget}
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
                waiting={waiting}
              />
            </footer>
          </div>
        </>
      )}
    </>
  );
}
