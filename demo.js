var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH = 500;
var HEIGHT = 50;
var rafID = null;

var debuglog = false;

window.onload = function () {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  audioContext = new AudioContext();

  document.querySelector("#start").addEventListener("click", function () {
    audioContext.resume().then(() => {
      console.log(
        "User interacted with the page. Playback resumed successfully"
      );
    });
  });

  document
    .querySelector("#startconsoledebug")
    .addEventListener("click", function () {
      debuglog = true;
    });

  document.querySelector("#stopconsoledebug").addEventListener("click", () => {
    debuglog = false;
  });

  // Attempt to get audio input
  try {
    // ask for an audio input
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          mandatory: {
            googEchoCancellation: "false",
            googAutoGainControl: "false",
            googNoiseSuppression: "false",
            googHighpassFilter: "false",
          },
          optional: [],
        },
      })
      .then(audioStream)
      .catch(didntGetStream);
  } catch (e) {
    alert("getUserMedia threw exception :" + e);
  }
};

function didntGetStream() {
  alert("Stream generation failed.");
}

function drawLoop(time) {
  // clear the background
  canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

  // check if we're currently clipping
  if (meter.checkClipping()) canvasContext.fillStyle = "red";
  else canvasContext.fillStyle = "green";

  // draw a bar based on the current volume
  canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);

  // set up the next visual callback
  rafID = window.requestAnimationFrame(drawLoop);
}
