const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeLine = document.getElementById("timeline");
const fullscreenBtn = document.getElementById("fullscreen");
const videoContainer = document.getElementById("videoContainer");
const videoControl = document.getElementById("videoControl");

video.volume = 0.5;
let volumeValue = video.volume;
let controlsTimeout = null;

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

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Muted";
  }
  volumeValue = value; // memory previous volume
  video.volume = value;
};
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeRange = (event) => {
  const {
    target: { value },
  } = event;
  console.log(value);
  video.currentTime=value;
};

const handleFullscreen= (event)=> {
    if(document.fullscreenElement){
        document.exitFullscreen();
        fullscreenBtn.innerText = "Enter fullscreen";
    } else {
        videoContainer.requestFullscreen();
        fullscreenBtn.innerText = "Exit fullscreen";
    }
}

const handleMouseMove = () => {
    if (controlsTimeout){
        clearTimeout(controlsTimeout);
        controlsTimeout=null;
    }
    videoControl.classList.add("showing");
}

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(()=> {
        videoControl.classList.remove("showing");
    }, 3000);
}
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeRange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);

timeLine.addEventListener("input", handleTimeRange);
fullscreenBtn.addEventListener("click", handleFullscreen);

video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);

//video.addEventListener("play", handlePlay);
//video.addEventListener("pause", handlePause);
