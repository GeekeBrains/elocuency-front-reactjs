export function playEmotion(type) {
  const max = 6; // Not include
  const min = 1; // Inlcuded
  const rand = Math.floor(Math.random() * (max - min) + min);
  const soundFile = 'audio/' + type + '/' + rand + '.mp3';
  console.log(soundFile);
  var audio = new Audio(soundFile);
  audio.play();
}
