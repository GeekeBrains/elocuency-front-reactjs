import {useEffect, useRef} from 'react';
import {ChatButton} from './ChatButton';
import {ChatMarkdown} from './ChatMarkdown';
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

  console.log('ChatMsgs', msgs);
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
        let msgComp = null;
        if (!msg.type || msg.type === 'text') {
          if (msg.userId === 'botPrize') {
            msgComp = <ChatMsgPrize key={'keyMsg' + index} msg={msg} />;
          } else {
            msgComp = (
              <ChatMsg
                key={'keyMsg' + index}
                msg={msg}
                voiceSpanish={voiceSpanish}
                voiceEnglish={voiceEnglish}
              />
            );
          }
        } else if (msg.type === 'markdown') {
          msgComp = <ChatMarkdown key={'keyMsg' + index} text={msg.text} />;
        } else if (msg.type === 'button') {
          msgComp = <ChatButton key={'keyMsg' + index} msg={msg} />;
        } else {
          console.error('type no definido', msg);
        }

        return msgComp;
      })}
    </div>
  );
};
