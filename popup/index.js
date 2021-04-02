var soundData = [
  {
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1f3oRPUgIifzY-TAmyoPwFp-p8LRZI7un"
  },
  {
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1OKyXTSAodLxBSIhjFi1cbV4Ekm2bT7Ba"
  },
  {
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1LIksI9Ym2wjv41Ng8XfVg1JHwD-aYjQW",
  },
  {
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1weqYpR8QCc2Nj_GYDm4CfiilomA3YTfm",
  },
  {
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=19BoF-dlH00G7TKlWTLJgr6W91x9mUX8Y",
  },
  {
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1I9SiKrbeoSk1ocmL1BAh4UQnuHrspTVj",
  },
  { 
    // https://drive.google.com/file/d/1xlCsDRC4iwn-CyRVO1Z0Day-xuNSNHT1/view?usp=sharing
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1xlCsDRC4iwn-CyRVO1Z0Day-xuNSNHT1"
  },
  {
    // https://drive.google.com/file/d/1YHJ0CqMfLmB5R72vaNFju0ZB1JqH7_Bu/view?usp=sharing
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1YHJ0CqMfLmB5R72vaNFju0ZB1JqH7_Bu"
  },
  {
    // https://drive.google.com/file/d/1fKzK_lm2ZlrokuQew-2pC2aSvA3zPRJK/view?usp=sharing
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1fKzK_lm2ZlrokuQew-2pC2aSvA3zPRJK"
  },
  {
    // https://drive.google.com/file/d/1Y2QgcdRJlZJlQPyuMzjbVUVqmAu62DKN/view?usp=sharing
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1Y2QgcdRJlZJlQPyuMzjbVUVqmAu62DKN"
  },
  {
    // https://drive.google.com/file/d/1CXMtdxH8Bg__jZAsAs_E-WJ0iQ3PguY1/view?usp=sharing
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1CXMtdxH8Bg__jZAsAs_E-WJ0iQ3PguY1"
  },
  {
    // https://drive.google.com/file/d/1ddLsZ1YJsbsyKCIys6cojpQJLG-Vpnqn/view?usp=sharing
    nodeName: "",
    sound: "http://docs.google.com/uc?export=open&id=1ddLsZ1YJsbsyKCIys6cojpQJLG-Vpnqn"
  },
]

function sendMessage(msg) {
  function gotTabs (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg)
  }
  var params = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, gotTabs)
}

function onPlay(e, s) {
  var msg = {
    ...s,
    name: e.target.name
  }
  sendMessage(msg)
}

function onChange(e) {
  var msg = {
    vol: e.target.value
  }
  sendMessage(msg)
}

function onStop() {
  var msg = {
    stop: true,
  }
  sendMessage(msg)
}



document.addEventListener('DOMContentLoaded', () => {
  soundData.forEach((s, i) => {
    var button = document.createElement("button")
    button.classList.add("sound-btn")
    button.classList.add("active")
    button.name = `button-${i}`
    button.onclick = (e) => onPlay(e, s)

    var section = document.createElement("section")
    var p = document.createElement("p")
    p.innerText = `CH-${i + 1}`
    section.appendChild(p)
    section.appendChild(button)
    section.classList.add("channel")
    
    var mixer = document.getElementById("mixer")
    mixer.appendChild(section)
  })
  var vol = document.getElementById("vol")
  vol.onchange = onChange

  var stopBtn = document.getElementById("stop-btn")
  stopBtn.onclick = onStop
})

