import { ChatMsg } from './ChatMsg';

export const ChatMsgs = ({ msgs, voiceSpanish, voiceEnglish }) => (
  <div
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
        <ChatMsg
          key={'keyMsg' + index}
          msg={msg}
          voiceSpanish={voiceSpanish}
          voiceEnglish={voiceEnglish}
        />
      );
    })}
  </div>
);
