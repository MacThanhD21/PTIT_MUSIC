const input = document.querySelector(".inner-genmusic input");
const btnGenMusic = document.querySelector(".inner-genmusic button");
input.addEventListener("input", function () {
  console.log(input.value);
});

const baseUrl = `https://5fc2-35-204-254-58.ngrok-free.app/musgen`;

async function musicGen(payload) {
  const url = `${baseUrl}?prompt=${input.value}&duration=${20}`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function getMusic() {
  const loadingIndicator = document.querySelector(".loader");
  const result = document.querySelector(".result");
  loadingIndicator.style.display = "block";
  loadingIndicator.style.transition = "all 0.5s ease-in-out";
  const audioData = await musicGen({
    sound_file: "",
  });

  if (audioData) {
    console.log(audioData);
    updateUI(audioData);
    loadingIndicator.style.display = "none";
    result.style.display = "block";
  }
}

btnGenMusic.addEventListener("click", async function () {
  getMusic();
});

function updateUI(audioData) {
  const element = document.querySelector(".item");
  const title = document.querySelector(".genMusicItem__title");
  title.textContent = `${input.value}`;
  const img = document.querySelector(".genMusicItem__img");
  img.src = "https://via.placeholder.com/150";
  const author = document.querySelector(".genMusicItem__author");
  author.textContent = "Team 18";
  const audioElement = document.querySelector(".item audio");
  audioElement.src = audioData;
  audioElement.autoplay = true;
  playAudio();
}

function playAudio() {
  const song = document.querySelector(".item");
  const audio = document.querySelector("audio");
  console.log(audio, song);
  song.addEventListener("click", (e) => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
}
