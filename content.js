let vol = 0.3
var currentPlay = []
let presounds = []

const play = (src) => {
  const player = presounds.find(i => i.src === src)
  player.volume = vol
  player.play()
  const id = Date.now()
  currentPlay.push({
    player,
    uid: id
  })
  if (player.duration) {
    setTimeout(() => {
      currentPlay = currentPlay.filter((i) => i.uid !== id)
    }, (player.duration + 100) * 1000)
  }
}

const stopAll = () => {
  currentPlay.forEach((i) => {
    i.player.pause()
    i.player.currentTime = 0
  })
  currentPlay = []
}
const changeVol = (vol) => {
  currentPlay.forEach((i) => (i.player.volume = vol))
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

function init() {
  chrome.storage.local.get(['sounds'], function (result) {
    const checkLoad = ((result.sounds) || [])
      .filter((i) => i.isUse)
      .map((audio) => {
        const player = new Audio(audio.sound)
        player.load()
        presounds.push(player)
        return new Promise((resolve) => {
          player.addEventListener('canplay', resolve);
        })
      })
    
    Promise.all(checkLoad).then(() => {
      chrome.storage.local.set({ loading: false })
    })
  })
}

chrome.runtime.onMessage.addListener(gotMessage)
init()
