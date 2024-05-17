import { users } from "../data/users.js";
import { songs } from "../data/songs.js";

import { getCookie } from "../helpers/cookies.js";
// console.log(users);

// get id from cookie
const userId = getCookie("accessToken");
// console.log(userId);
const user_fined = users.find((user) => user._id === userId);
// console.log(user_fined);

// Get list recent played
const recentPlayedListId = user_fined.recentPlay;
// console.log(recentPlayedListId);

const recentPlayedSongs = songs.filter((song) =>
  recentPlayedListId.includes(song._id)
);
// console.log(recentPlayedSongs);

// Render recent played
const trending_container = document.getElementById("treding_container");
// console.log(trending_container);
let idx_cur_song = 0;
const songsCount = recentPlayedSongs.length;


const recentPlayed = {
  render: function () {
    let song_1;
    if (idx_cur_song < songsCount) {
      song_1 = recentPlayedSongs[idx_cur_song];

      if (!song_1) {
        return;
      }
    }
    console.log(song_1);

    idx_cur_song += 1;
    const html = `
    <!-- CARD GROUP GRID -->
<div class="card-group-grid">
  <div class="card-playing-horizontal">
    <div class="btnHandleMusic">
      <span class="fa-solid fa-play" onclick=""></span>
      <span class="fa-solid fa-pause" onclick=""></span>
    </div>
    <audio src="${song_1.link}" id="audio"></audio>
    <figure class="card-playing-horizontal-header">
      <a><img src="${song_1.imagecover}" alt="" /></a>
    </figure>
    <div class="card-playing-horizontal-body">
      <h4>
        <span>${song_1.title}</span>
      </h4>
      <p>
        <span>${song_1.artist}</span>
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
  </div>
  <div class="card-playing-horizontal">
    <div class="btnHandleMusic">
      <span class="fa-solid fa-play" onclick=""></span>
      <span class="fa-solid fa-pause" onclick=""></span>
    </div>
    <audio src="${song_1.link}" id="audio"></audio>
    <figure class="card-playing-horizontal-header">
      <a><img src="${song_1.imagecover}" alt="" /></a>
    </figure>
    <div class="card-playing-horizontal-body">
      <h4>
        <span>${song_1.title}</span>
      </h4>
      <p>
        <span>${song_1.artist}</span>
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
  </div>
  <div class="card-playing-horizontal">
    <div class="btnHandleMusic">
      <span class="fa-solid fa-play" onclick=""></span>
      <span class="fa-solid fa-pause" onclick=""></span>
    </div>
    <audio src="${song_1.link}" id="audio"></audio>
    <figure class="card-playing-horizontal-header">
      <a><img src="${song_1.imagecover}" alt="" /></a>
    </figure>
    <div class="card-playing-horizontal-body">
      <h4>
        <span>${song_1.title}</span>
      </h4>
      <p>
        <span>${song_1.artist}</span>
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
  </div>
  <div class="card-playing-horizontal">
    <div class="btnHandleMusic">
      <span class="fa-solid fa-play" onclick=""></span>
      <span class="fa-solid fa-pause" onclick=""></span>
    </div>
    <audio src="${song_1.link}" id="audio"></audio>
    <figure class="card-playing-horizontal-header">
      <a><img src="${song_1.imagecover}" alt="" /></a>
    </figure>
    <div class="card-playing-horizontal-body">
      <h4>
        <span>${song_1.title}</span>
      </h4>
      <p>
        <span>${song_1.artist}</span>
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
  </div>
  <div class="card-playing-horizontal">
    <div class="btnHandleMusic">
      <span class="fa-solid fa-play" onclick=""></span>
      <span class="fa-solid fa-pause" onclick=""></span>
    </div>
    <audio src="${song_1.link}" id="audio"></audio>
    <figure class="card-playing-horizontal-header">
      <a><img src="${song_1.imagecover}" alt="" /></a>
    </figure>
    <div class="card-playing-horizontal-body">
      <h4>
        <span>${song_1.title}</span>
      </h4>
      <p>
        <span>${song_1.artist}</span>
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
  </div>
  <div class="card-playing-horizontal">
    <div class="btnHandleMusic">
      <span class="fa-solid fa-play" onclick=""></span>
      <span class="fa-solid fa-pause" onclick=""></span>
    </div>
    <audio src="${song_1.link}" id="audio"></audio>
    <figure class="card-playing-horizontal-header">
      <a><img src="${song_1.imagecover}" alt="" /></a>
    </figure>
    <div class="card-playing-horizontal-body">
      <h4>
        <span>${song_1.title}</span>
      </h4>
      <p>
        <span>${song_1.artist}</span>
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
  </div>
  <div class="card-playing-horizontal">
    <div class="btnHandleMusic">
      <span class="fa-solid fa-play" onclick=""></span>
      <span class="fa-solid fa-pause" onclick=""></span>
    </div>
    <audio src="${song_1.link}" id="audio"></audio>
    <figure class="card-playing-horizontal-header">
      <a><img src="${song_1.imagecover}" alt="" /></a>
    </figure>
    <div class="card-playing-horizontal-body">
      <h4>
        <span>${song_1.title}</span>
      </h4>
      <p>
        <span>${song_1.artist}</span>
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
  </div>
</div>`;
    trending_container.innerHTML += html;
  },
  handle: function () {
    const audio = document.getElementById("audio");
    const playBtn = document.querySelector(".fa-play");
    const pauseBtn = document.querySelector(".fa-pause");

    playBtn.addEventListener("click", () => {
      audio.play();
    });

    pauseBtn.addEventListener("click", () => {
      audio.pause();
    });
  },
  start: function () {
    this.render();
    // this.handle();
  },
};

recentPlayed.start();

// Path: assets/js/services/recentPlayed.js
