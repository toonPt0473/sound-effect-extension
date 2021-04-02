let vol = 0.3
var currentPlay = []

const play = (sound) => {
  const audio = new Audio(sound);
  audio.onloadedmetadata = () => {
    audio.volume = vol
    audio.play()
    const id = Date.now()
    currentPlay.push({
      audio,
      uid: id
    })
    if (audio.duration) {
      setTimeout(() => {
        currentPlay = currentPlay.filter(i => i.uid !== id)
      }, audio.duration * 1000);
    }
  }
}

const stopAll = () => {
  currentPlay.forEach(i => {
    i.audio.pause();
    i.audio.currentTime = 0;
  })
  currentPlay = []
}
const changeVol = (vol) => {
  currentPlay.forEach(i => i.audio.volume = vol)
}

function gotMessage(message, sender, sendResponse) {
  if (message.sound) {
    play(message.sound)
  }
  if (message.vol) {
    vol = Number(message.vol) / 10
    changeVol(vol)
  }
  if (message.stop) {
    stopAll()
  }
}

chrome.runtime.onMessage.addListener(gotMessage)
