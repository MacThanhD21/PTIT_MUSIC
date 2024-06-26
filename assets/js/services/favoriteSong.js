import {
  songs
} from "../data/songs.js";
import {
  getAverageColor
} from "../helpers/getAverageColor.js";
import {
  favoriteListId
} from "../data/getUserById.js";

const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);
const favoriteSongs = songs.filter((song) => favoriteListId.includes(song._id));
// console.log(favoriteSongs);
const trending_container = $("#treding_container .card-group-grid");

const recentPlayed = {
  render: function() {
    const html = favoriteSongs
      .map((song) => {
        return `
          <div class="card-playing-horizontal">
            <div class="btnHandleMusic">
              <span class="fa-solid fa-play" onclick=""></span>
              <span class="fa-solid fa-pause" onclick=""></span>
            </div>
            <audio src="${song.link}" id="audio"></audio>
            <figure class="card-playing-horizontal-header">
              <a><img src="${song.imagecover}" alt="" /></a>
            </figure>
            <div class="card-playing-horizontal-body">
              <h4>
                <span>${song.title}</span>
              </h4>
              <p>
                <span>${song.artist}</span>
              </p>
            </div>
            <div class="card-playing-horizontal-footer">
              <div class="btnHandleDif likeMusic">
                <i class="fa-solid fa-heart"></i>
              </div>
              <div class="btnHandleDif downloadMusic">
                <i class="fa-solid fa-download"></i>
              </div>
            </div>
          </div>`;
      })
      .join(""); // Join the array of HTML strings into a single string

    // Assign the generated HTML to the container's innerHTML
    trending_container.innerHTML = html;
  },
  handlePlayMusic: () => {
    // const trendingSection = $("#treding_container");
    // const btnHandleMusic = $$(".btnHandleMusic");
    const songItems = $$(
      "#treding_container .card-group-grid .card-playing-horizontal"
    );

    // console.log(songItems);
    const audio = $$(".card-playing-horizontal #audio");
    // console.log(audio);
    // console.log(Array.from(audio));
    const playBtn = $$(".btnHandleMusic .fa-play");
    const pauseBtn = $$(".btnHandleMusic .fa-pause");
    const imageElement = $$(".card-playing-horizontal-header img");
    // console.log(imageElement);
    const likeBtn = $$(".likeMusic");
    const downloadBtn = $$(".downloadMusic");
    let cur_index;
    songItems.forEach((song, index) => {
      song.addEventListener("click", (e) => {
        // console.log(imageElement[index]);
        const clickedSong = e.currentTarget;
        // console.log(clickedSong);
        const otherSongs = Array.from(songItems).filter(
          (item) => item !== clickedSong
        );

        if (
          !e.target.classList.contains("fa-heart") &&
          !e.target.classList.contains("fa-download")
        ) {
          const imgElement = new Image();
          if (imgElement) {
            // console.log(imgElement);
            imgElement.src = imageElement[index].src;
            imgElement.setAttribute("crossOrigin", "anonymous");
            imgElement.onload = function() {
              const {
                R,
                G,
                B
              } = getAverageColor(imgElement, 4);
              // console.log(R, G, B);
              const color = `rgb(${R}, ${G}, ${B})`;
              song.style.backgroundColor = color;
            };
          }
          const audioElement = audio[index];
          const currentPlayingAudio = document.querySelector(".playing audio");
          cur_index = Array.from(audio).indexOf(currentPlayingAudio);
          // console.log(cur_index);
          if (currentPlayingAudio && currentPlayingAudio !== audioElement) {
            try {
              currentPlayingAudio.pause();
              currentPlayingAudio.currentTime = 0;
              currentPlayingAudio.parentElement.classList.remove("playing");
              const index = Array.from(audio).indexOf(currentPlayingAudio);
              playBtn[index].style.display = "inline-block";
              pauseBtn[index].style.display = "none";
            } catch (err) {
              audioElement.pause();
            }
          }

          song.classList.toggle("playing");

          if (audioElement.paused) {
            audioElement.play();
            playBtn[index].style.display = "none";
            pauseBtn[index].style.display = "inline-block";
          } else {
            audioElement.pause();
            playBtn[index].style.display = "inline-block";
            pauseBtn[index].style.display = "none";
          }
          // HandleEvents
          audioElement.addEventListener("ended", () => {
            song.classList.remove("playing");
            playBtn[index].style.display = "inline-block";
            pauseBtn[index].style.display = "none";
          });
        }
      });
    });

    // Like Music

    likeBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
      });
    });

    // Download Music

    downloadBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // Tải xuống tệp MP3
        const currentAudio = audio[index];
        const audioSource = audioElement.src;
        const downloadLink = document.createElement("a");
        // gán đường link
        downloadLink.href = audioSource;
        // xét thuộc tính cho thẻ a
        downloadLink.setAttribute("target", "_blank");
        downloadLink.setAttribute("rel", "noopener noreferrer");
        downloadLink.setAttribute("download", `${songs[index].title}`);
        // thêm vào body
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    });
  },
  start: function() {
    this.render();
    this.handlePlayMusic();
  },
};

recentPlayed.start();

// Path: assets/js/services/recentPlayed.js