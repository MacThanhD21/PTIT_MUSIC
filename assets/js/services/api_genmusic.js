
const input = document.querySelector(".inner-genmusic input");
const btnGenMusic = document.querySelector(".inner-genmusic button");
input.addEventListener("input", function () {
  console.log(input.value);
});
const baseUrl = "https://suno-ai-three.vercel.app";
async function customGenerateAudio(payload) {
  const url = `${baseUrl}/api/custom_generate`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function generateAudioByPrompt(payload) {
  const url = `${baseUrl}/api/generate`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function getAudioInformation(audioIds) {
  const url = `${baseUrl}/api/get?ids=${audioIds}`;
  const response = await axios.get(url);
  return response.data;
}

async function getQuotaInformation() {
  const url = `${baseUrl}/api/get_limit`;
  const response = await axios.get(url);
  return response.data;
}

async function getMusic() {
  try {

    const loadingIndicator = document.querySelector(".loader");
    const result = document.querySelector(".result");
    loadingIndicator.style.display = "block";
    loadingIndicator.style.transition = "all 0.5s ease-in-out";
    const audioData = await generateAudioByPrompt({
      prompt: input.value,
      make_instrumental: false,
      wait_audio: false,
    });
    const ids = `${audioData[0].id},${audioData[1].id}`;
    for (let i = 0; i < 60; i++) {
      const data = await getAudioInformation(ids);
      if (data[0].status === "streaming" && data[1].status === "streaming") {
        updateUI(data);
        loadingIndicator.style.display = "none";
        result.style.display = "block";
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } catch (error) {
    const loadingIndicator = document.querySelector(".loader");
    loadingIndicator.style.display = "none";

    if (error.response && error.response.status === 402) {
      alert("Bạn đã dùng hết credits, vui lòng nạp VIP để sử dụng tiếp.");
    } else {
      console.error("Error generating audio:", error);
    }
  }
}
btnGenMusic.addEventListener("click", async function () {
  getMusic();
});


function updateUI(songDetails) {
  const infoElements = document.querySelectorAll(".item");
  for (let i = 0; i < 2; i++) {
    infoElements[i].querySelector(".genMusicItem__img img").src =
      songDetails[i].image_url;
    infoElements[i].querySelector(".genMusicItem__title").textContent =
      songDetails[i].title;
    infoElements[i].querySelector(".genMusicItem__author").textContent =
      songDetails[i].tags;
    infoElements[i].querySelector(".genMusicItem__action audio").src =
      songDetails[i].audio_url;
  }
  playAudio();
}
function playAudio() {
  const songItems = document.querySelectorAll(".item");
  const audio = document.querySelectorAll("audio");
  songItems.forEach((song, index) => {
    song.addEventListener("click", (e) => {
      const audioElement = audio[index];
      const currentPlayingAudio = document.querySelector(".playing audio");
      if (currentPlayingAudio && currentPlayingAudio !== audioElement) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
        currentPlayingAudio.parentElement.parentElement.classList.remove(
          "playing"
        );
      }

      song.classList.toggle("playing");

      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    });
  });
}
