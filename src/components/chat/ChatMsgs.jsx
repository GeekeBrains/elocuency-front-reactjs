import { ChatMsg } from './ChatMsg';

export const ChatMsgs = ({ msgs, voiceSpanish, voiceEnglish }) => (
  <div
    id="chatView"
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: 'url("/images/background1.jpg")',
      // backgroundSize: 'cover',
      backgroundSize: 'contain',
      backgroundRepeat: 'repeat',
      height: 'fit-content',
      minHeight: '90vh',
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
