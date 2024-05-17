import {
  songs as t
} from "../data/songs.js";
import {
  albums as e
} from "../data/albums.js";
import {
  Categories as n
} from "../data/category.js";
import {
  getAverageColor as a
} from "../helpers/getAverageColor.js";
let $ = document.querySelector.bind(document),
  $$ = document.querySelectorAll.bind(document),
  PlAYER_STORAGE_KEY = "PTITMUSIC_PLAYER",
  player = $(".player"),
  dashboard = $(".dashboard"),
  cd = $(".cd"),
  heading = $(".header h2 span"),
  cdThumb = $(".cd-thumb"),
  audio = $("#audio"),
  playBtn = $(".btn-toggle-play"),
  progress = $("#progress"),
  prevBtn = $(".btn-prev"),
  nextBtn = $(".btn-next"),
  randomBtn = $(".btn-random"),
  repeatBtn = $(".btn-repeat"),
  playlist = $(".playlist"),
  notification = $("#noti"),
  navbar = $("#navbarFixed"),
  currentTime = $(".currentTime"),
  remainTime = $(".remainTime"),
  songsCount = t.length,
  favoriteSong = $(".favoriteSong"),
  searchInput = $("#search input"),
  idx_cur_song = 0,
  listDataArray = [],
  queryString = window.location.search,
  urlParams = new URLSearchParams(queryString),
  songMap = new Map,
  albumMap = new Map,
  cateMap = new Map;
async function getSongById(t) {
  return await songMap.get(t)
}
async function getAlbumById(t) {
  return await albumMap.get(t)
}
async function getCateById(t) {
  return await cateMap.get(t)
}
async function getListData(t) {
  try {
    let e = t.map(t => getSongById(t)),
      n = await Promise.all(e),
      a = n.filter(t => null !== t);
    return a
  } catch (r) {
    return console.error("Error fetching song data:", r), []
  }
}

function handleFetchDataError(t) {
  console.error(`Error fetching data: ${t}`)
}
t.forEach(t => {
  songMap.set(t._id, t)
}), e.forEach(t => {
  albumMap.set(t._id, t)
}), n.forEach(t => {
  cateMap.set(t._id, t)
});
try {
  if (urlParams.has("albumId")) {
    let r = urlParams.get("albumId"),
      i = await getAlbumById(r);
    if (i) listDataArray = await getListData(i.tracks);
    else {
      let o = Math.floor(Math.random() * e.length);
      listDataArray = await getListData(e[o].tracks)
    }
  } else if (urlParams.has("cateId")) {
    let s = urlParams.get("cateId"),
      l = await getCateById(s);
    if (l) listDataArray = await getListData(l.tracks);
    else {
      let c = Math.floor(Math.random() * n.length);
      listDataArray = await getListData(n[c].tracks)
    }
  } else listDataArray = t
} catch (d) {
  handleFetchDataError(d.message)
}
let processCurSongPlaying = () => {
    let t = $$(".card-playing-horizontal #audio"),
      e = $$(".btnHandleMusic .fa-play"),
      n = $$(".btnHandleMusic .fa-pause"),
      a = document.querySelector(".card-playing-horizontal.playing audio");
    if (a) try {
      a.pause(), a.currentTime = 0, a.parentElement.classList.remove("playing");
      let r = Array.from(t).indexOf(a); - 1 !== r && (e[r].style.display = "inline-block", n[r].style.display = "none")
    } catch (i) {
      console.error("Error:", i)
    }
  },
  app = {
    currentIndex: 0,
    isPlaying: !1,
    isRandom: !1,
    isRepeat: !1,
    config: {},
    songs: listDataArray,
    removeAccents: function(t) {
      return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    },
    searchF: function() {
      let t = this,
        e, n = [];
      searchInput.addEventListener("input", function(a) {
        clearTimeout(e), e = setTimeout(function() {
          let e = t.removeAccents(a.target.value.toLowerCase());
          if (0 === (n = "" === e ? listDataArray : t.songs.filter(n => {
              let a = t.removeAccents(n.title.toLowerCase()),
                r = t.removeAccents(n.artist.toLowerCase());
              return a.startsWith(e) || r.startsWith(e)
            })).length) notification.innerHTML = `
        <h2>No results found for "${a.target.value}"</h2>
        <p>Please make sure your words are spelled correctly, or use fewer or different keywords</p>
      `, notification.style.display = "flex";
          else {
            notification.style.display = "none";
            let r = n.map((e, n) => `
                  <div class="song ${n===t.currentIndex?"active":""}" data-index="${n}">
                    <div class="thumb" style="background-image: url('${e.imagecover?e.imagecover:""}')"></div>
                    <div class="body">
                        <h3 class="title">${e.title}</h3>
                        <p class="author">${e.artist}</p>
                    </div>
                    <div class="favoriteSong">
                      <i class="fa-solid fa-heart"></i>
                    </div>
                  </div>
            `);
            playlist.innerHTML = r.join("")
          }
          app.songs = n, app.render__one();
          let i = document.querySelectorAll(".song");
          i.forEach(e => {
            e.onclick = function() {
              t.currentIndex = Number(e.dataset.index), t.loadCurrentSong(), audio.addEventListener("canplaythrough", function() {
                audio.play()
              })
            }
          }), i.forEach(t => {
            t.classList.remove("active")
          })
        }, 500)
      })
    },
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    setConfig: function(t, e) {
      this.config[t] = e, localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render__one: function() {
      let t = this.songs.map((t, e) => {
        if (void 0 != t) return `
              <div class="song ${e===this.currentIndex?"active":""}" data-index="${e}">
                  <div class="thumb"
                      style="background-image: url('${t.imagecover?t.imagecover:""}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${t.title}</h3>
                      <p class="author">${t.artist}</p>
                  </div>
                  <div class="favoriteSong">
                    <i class="fa-solid fa-heart"></i>
                  </div>
              </div>
          `
      });
      playlist.innerHTML = t.join("")
    },
    defineProperties: function() {
      Object.defineProperty(this, "currentSong", {
        get: function() {
          return this.songs[this.currentIndex]
        }
      })
    },
    handleEvents: function() {
      let t = this,
        e = cdThumb.animate([{
          transform: "rotate(360deg)"
        }], {
          duration: 1e4,
          iterations: 1 / 0
        });
      e.pause(), audio.ontimeupdate = function t() {
        if (!isNaN(audio.duration)) {
          let e = Math.floor(audio.currentTime / 60),
            n = Math.floor(audio.currentTime % 60),
            a = Math.floor((audio.duration - audio.currentTime) / 60),
            r = Math.floor((audio.duration - audio.currentTime) % 60),
            i = `${e}:${n<10?"0":""}${n}`,
            o = `${a}:${r<10?"0":""}${r}`;
          currentTime.innerHTML = `<span>${i}</span>`, remainTime.innerHTML = `<span>${o}</span>`
        }
        if (audio.duration) {
          let s = Math.floor(audio.currentTime / audio.duration * 100);
          progress.value = s
        }
      }, playBtn.onclick = function e() {
        t.isPlaying ? audio.pause() : audio.play()
      }, audio.onplay = function n() {
        processCurSongPlaying(), t.isPlaying = !0, player.classList.add("playing"), e.play()
      }, audio.onpause = function n() {
        t.isPlaying = !1, player.classList.remove("playing"), e.pause()
      }, progress.oninput = function t(e) {
        let n = audio.duration / 100 * e.target.value;
        audio.currentTime = n
      }, nextBtn.onclick = function e() {
        t.isRandom ? t.playRandomSong() : t.nextSong(), audio.play(), t.render__one(), t.scrollToActiveSong()
      }, prevBtn.onclick = function e() {
        t.isRandom ? t.playRandomSong() : t.prevSong(), audio.play(), t.render__one(), t.scrollToActiveSong()
      }, randomBtn.onclick = function e() {
        t.isRandom = !t.isRandom, t.setConfig("isRandom", t.isRandom), randomBtn.classList.toggle("active", t.isRandom)
      }, repeatBtn.onclick = function e() {
        t.isRepeat = !t.isRepeat, t.setConfig("isRepeat", t.isRepeat), repeatBtn.classList.toggle("active", t.isRepeat)
      }, audio.onended = function() {
        t.isRepeat ? audio.play() : nextBtn.click()
      }, playlist.onclick = function e(n) {
        let a = n.target.closest(".song:not(.active)");
        (a || !n.target.contains(".favoriteSong")) && (a && (t.currentIndex = Number(a.dataset.index), t.loadCurrentSong(), t.render__one(), audio.play()), n.target.closest(".favoriteSong") && n.target.classList.toggle("active"))
      }
    },
    scrollToActiveSong: function() {
      setTimeout(() => {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        })
      }, 400)
    },
    loadCurrentSong: function() {
      if (this.currentSong) {
        player.style.cssText = `background: url('${this.currentSong.imagecover}') no-repeat center center; background-size: cover; object-fit: cover;`, heading.textContent = this.currentSong.title, cdThumb.style.backgroundImage = `url('${this.currentSong.imagecover}')`, audio.src = this.currentSong.link;
        let t = new Image;
        t ? (t.src = app.currentSong.imagecover, t.setAttribute("crossOrigin", "anonymous"), t.onload = function() {
          let {
            R: e,
            G: n,
            B: r
          } = a(t, 4);
          $(".side-bar").style.background = `rgb(${e}, ${n},${r})`, $(".main").style.background = `rgb(${e}, ${n},${r})`, $("#navbarFixed").style.background = `rgb(${e}, ${n},${r})`
        }) : console.error("mainColor element not found.")
      } else console.error("Current song is undefined or does not have a title property.")
    },
    loadConfig: function() {
      this.isRandom = this.config.isRandom, this.isRepeat = this.config.isRepeat
    },
    nextSong: function() {
      this.currentIndex++, this.currentIndex >= this.songs.length && (this.currentIndex = 0), this.loadCurrentSong()
    },
    prevSong: function() {
      this.currentIndex--, this.currentIndex < 0 && (this.currentIndex = this.songs.length - 1), this.loadCurrentSong()
    },
    playRandomSong: function() {
      let t;
      do t = Math.floor(Math.random() * this.songs.length); while (t === this.currentIndex);
      this.currentIndex = t, this.loadCurrentSong()
    },
    start: function() {
      this.loadConfig(), this.defineProperties(), this.render__one(), this.loadCurrentSong(), this.handleEvents(), randomBtn.classList.toggle("active", this.isRandom), repeatBtn.classList.toggle("active", this.isRepeat), this.searchF()
    }
  };
app.start();