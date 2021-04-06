import { useState } from 'react';
import { ChatMic } from './ChatMic';

try {
  var SpeechRecognition = global.SpeechRecognition || global.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  console.log('RECOGN', recognition);
} catch (e) {
  console.error(e);
}

export const ChatInput = ({ onAdd }) => {
  const [text, setText] = useState('');

  recognition.onerror = function (event) {
    if (event.error === 'no-speech') {
      console.log('No speech was detected. Try again.');
    }
  };
  // recognition.start();

  recognition.onstart = function () {
    console.log('Voice recognition activated. Try speaking into the microphone.');
  };

  recognition.onspeechend = function () {
    console.log('You were quiet for a while so voice recognition turned itself off.');
  };

  recognition.onresult = function (event) {
    console.log('Voice rec result: ', event.results);
    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far.
    // We only need the current one.
    var current = event.resultIndex;

    // Get a transcript of what was said.
    // var transcript = event.results[current][0].transcript;

    // setText(event.results[current][0].transcript);
    console.log('speech', { text: event.results[current][0].transcript, res: event.results });
    onAdd(event.results[current][0].transcript, event.results);
    setText('');

    // Add the current transcript to the contents of our Note.
    // noteContent += transcript;
    // noteTextarea.val(noteContent);
  };

  return (
    <footer style={{ display: 'flex', flexDirection: 'row' }}>
      <input
        style={{
          fontSize: 20,
          width: '100%',
          margin: 5,
          padding: 5,
          borderRadius: 15,
        }}
        value={text}
        onKeyPress={(key) => {
          // console.log({ key });
          if (key.code === 'Enter') {
            onAdd(text);
            setText('');
          }
        }}
        onChange={(v) => {
          setText(v.target.value);
        }}
      ></input>
      <ChatMic
        onMouseDown={() => {
          recognition.start();
        }}
        onMouseUp={() => {
          recognition.stop();
        }}
      />
    </footer>
  );
};
