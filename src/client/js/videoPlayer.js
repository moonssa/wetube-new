const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

video.volume = 0.5;
let volumeValue =video.volume;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmuted" : "Muted";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeRange = (event) => {
  const {
    target: { value },
  } = event;

  if(video.muted){
      video.muted = false;
      muteBtn.innerText = "Muted";
  }
  volumeValue = value;  // memory previous volume
  video.volume = value;
};
//const handlePlay = () => (playBtn.innerText = "Pause");
//const handlePause = () => (playBtn.innerText = "Play");

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeRange);

//video.addEventListener("play", handlePlay);
//video.addEventListener("pause", handlePause);
