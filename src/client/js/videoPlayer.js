const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute"); 
const time = document.getElementById("time"); 
const volume = document.getElementById("volume");

const handlePlayClick = (e) =>{
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

const handleMuteClick = (e) => {

}

const handlePlay = () => (playBtn.innerText="pause");
const handlePause = () => (playBtn.innerText="play");

playBtn.addEventListener("click",handlePlayClick);
muteBtn.addEventListener("click",handleMuteClick);

video.addEventListener("play",handlePlay);
video.addEventListener("pause",handlePause);


