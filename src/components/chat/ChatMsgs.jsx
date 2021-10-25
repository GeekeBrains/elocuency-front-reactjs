import {useEffect, useRef} from 'react';
import {ChatMsg} from './ChatMsg';
import {ChatMsgPrize} from './ChatMsgPrize';

export const ChatMsgs = ({
  //ref,
  msgs,
  voiceSpanish,
  voiceEnglish,
}) => {
  const chatMsgsRef = useRef();

  useEffect(() => {
    // console.log('ref:', chatMsgsRef);
    const chatView = chatMsgsRef.current; //?.scrollIntoView({ behavior: "smooth" });
    // var chatView = global.document.getElementById('chatView');
    chatView.scrollTop = chatView.scrollHeight - chatView.clientHeight;
    // console.log("scroll", chatView);
  }, [msgs]);

  return (
    <div
      ref={chatMsgsRef}
      id="chatView"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        overflowY: 'auto',
      }}
    >
      {msgs.map((msg, index) => {
        return (
          <>
            {msg.userId === 'botPrize' ? (
              <ChatMsgPrize key={'keyMsgPrize' + index} msg={msg} />
            ) : (
              <ChatMsg
                key={'keyMsg' + index}
                msg={msg}
                voiceSpanish={voiceSpanish}
                voiceEnglish={voiceEnglish}
              />
            )}
          </>
        );
      })}
    </div>
  );
};
