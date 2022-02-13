const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

const handleStartRecord = async () => {
  console.log("teststtse");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

startBtn.addEventListener("click", handleStartRecord);