const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playAudioWithPanOscillation() {
  document.querySelector("audio")?.remove();
  let audio = document.createElement("audio");
  audio.src = "e.mp3";
  document.body.appendChild(audio);
  const track = audioContext.createMediaElementSource(audio);
  const panner = audioContext.createStereoPanner();

  track.connect(panner).connect(audioContext.destination);

  audio.play();

  let panValue = -1; // Start from left speaker
  let direction = 1; // 1 for moving towards the right, -1 for moving towards the left

  const panInterval = setInterval(() => {
    panner.pan.value = panValue;

    // Update panValue based on direction
    panValue += direction * 0.02; // Increase or decrease smoothly

    // Reverse direction when limits (-1 or 1) are reached
    if (panValue >= 1) {
      direction = -1; // Switch to moving left
    } else if (panValue <= -1) {
      direction = 1; // Switch to moving right
    }
  }, 100); // Adjust this value to make it smoother or faster
}

document.getElementById("audioBtn").addEventListener("click", () => {
  console.log("Audio Played")
  playAudioWithPanOscillation(); // Start with oscillating pan
});
