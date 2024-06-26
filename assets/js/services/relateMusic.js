import { songs } from "../data/specifyDataMusic.js";
import { getAverageColor } from "../helpers/getAverageColor.js";
const $ = document.querySelector.bind(document),
  $$ = document.querySelectorAll.bind(document),
  relatedMusic = $$("#section__trending .card-group-grid");
let idx_cur_song = 0,
  songsCount = songs.length;
const render__two = () => {
    relatedMusic.forEach((n) => {
      let a, s, i, l, o, d;
      if (
        idx_cur_song < songsCount &&
        ((a = songs[idx_cur_song]),
        (s = idx_cur_song + 1 < songsCount ? songs[idx_cur_song + 1] : null),
        (i = idx_cur_song + 2 < songsCount ? songs[idx_cur_song + 2] : null),
        (l = idx_cur_song + 3 < songsCount ? songs[idx_cur_song + 3] : null),
        (o = idx_cur_song + 4 < songsCount ? songs[idx_cur_song + 4] : null),
        (d = idx_cur_song + 5 < songsCount ? songs[idx_cur_song + 5] : null),
        !(a && s && i && l && o && d))
      )
        return;
      idx_cur_song += 6;
      const e = `\n      <div class="card-playing-horizontal">\n        <div class="btnHandleMusic">\n          <span class="fa-solid fa-play" onclick=""></span>\n          <span class="fa-solid fa-pause" onclick=""></span>\n        </div>\n        <audio src="${a.link}" id="audio"></audio>\n        <figure class="card-playing-horizontal-header">\n          <img src="${a.imagecover}" alt="" />\n        </figure>\n        <div class="card-playing-horizontal-body">\n          <h4>\n            <span>${a.title}</span>\n          </h4>\n          <p>\n            <span>${a.artist}</span>\n          </p>\n        </div>\n        <div class="card-playing-horizontal-footer">\n          <div class="btnHandleDif likeMusic">\n            <i class="fa-solid fa-heart"></i>\n          </div>\n          <div class="btnHandleDif downloadMusic">\n            <i class="fa-solid fa-download"></i>\n          </div>\n        </div>\n      </div>\n\n      <div class="card-playing-horizontal">\n        <div class="btnHandleMusic">\n          <span class="fa-solid fa-play" onclick=""></span>\n          <span class="fa-solid fa-pause" onclick=""></span>\n        </div>\n        <audio src="${s.link}" id="audio"></audio>\n        <figure class="card-playing-horizontal-header">\n          <img src="${s.imagecover}" alt="" />\n        </figure>\n        <div class="card-playing-horizontal-body">\n          <h4>\n            <span>${s.title}</span>\n          </h4>\n          <p>\n            <span>${s.artist}</span>\n          </p>\n        </div>\n        <div class="card-playing-horizontal-footer">\n          <div class="btnHandleDif likeMusic">\n            <i class="fa-solid fa-heart"></i>\n          </div>\n          <div class="btnHandleDif downloadMusic">\n            <i class="fa-solid fa-download"></i>\n          </div>\n        </div>\n      </div>\n\n      <div class="card-playing-horizontal">\n        <div class="btnHandleMusic">\n          <span class="fa-solid fa-play" onclick=""></span>\n          <span class="fa-solid fa-pause" onclick=""></span>\n        </div>\n        <audio src="${i.link}" id="audio"></audio>\n        <figure class="card-playing-horizontal-header">\n          <img src="${i.imagecover}" alt="" />\n        </figure>\n        <div class="card-playing-horizontal-body">\n          <h4>\n            <span>${i.title}</span>\n          </h4>\n          <p>\n            <span>${i.artist}</span>\n          </p>\n        </div>\n        <div class="card-playing-horizontal-footer">\n          <div class="btnHandleDif likeMusic">\n            <i class="fa-solid fa-heart"></i>\n          </div>\n          <div class="btnHandleDif downloadMusic">\n            <i class="fa-solid fa-download"></i>\n          </div>\n        </div>\n      </div>\n      <div class="card-playing-horizontal">\n        <div class="btnHandleMusic">\n          <span class="fa-solid fa-play" onclick=""></span>\n          <span class="fa-solid fa-pause" onclick=""></span>\n        </div>\n        <audio src="${l.link}" id="audio"></audio>\n        <figure class="card-playing-horizontal-header">\n          <img src="${l.imagecover}" alt="" />\n        </figure>\n        <div class="card-playing-horizontal-body">\n          <h4>\n            <span>${l.title}</span>\n          </h4>\n          <p>\n            <span>${l.artist}</span>\n          </p>\n        </div>\n        <div class="card-playing-horizontal-footer">\n          <div class="btnHandleDif likeMusic">\n            <i class="fa-solid fa-heart"></i>\n          </div>\n          <div class="btnHandleDif downloadMusic">\n            <i class="fa-solid fa-download"></i>\n          </div>\n        </div>\n      </div>\n    </div>\n    `;
      n.innerHTML += e;
    });
  },
  handlePlayMusic = () => {
    const n = $$(
        "#section__trending .card-group-grid .card-playing-horizontal"
      ),
      a = $$(".card-playing-horizontal #audio"),
      s = $$(".btnHandleMusic .fa-play"),
      i = $$(".btnHandleMusic .fa-pause"),
      l = $$(".card-playing-horizontal-header img"),
      o = $$(".likeMusic"),
      d = $$(".downloadMusic");
    let e;
    n.forEach((o, d) => {
      o.addEventListener("click", (c) => {
        const r = c.currentTarget;
        Array.from(n).filter((n) => n !== r);
        if (
          !c.target.classList.contains("fa-heart") &&
          !c.target.classList.contains("fa-download")
        ) {
          const n = new Image();
          n &&
            ((n.src = l[d].src),
            n.setAttribute("crossOrigin", "anonymous"),
            (n.onload = function () {
              const { R: a, G: s, B: i } = getAverageColor(n, 4),
                l = `rgb(${a}, ${s}, ${i})`;
              o.style.backgroundColor = l;
            }));
          const c = a[d],
            r = document.querySelector(".playing audio");
          if (((e = Array.from(a).indexOf(r)), r && r !== c))
            try {
              r.pause(),
                (r.currentTime = 0),
                r.parentElement.classList.remove("playing");
              const n = Array.from(a).indexOf(r);
              (s[n].style.display = "inline-block"),
                (i[n].style.display = "none");
            } catch (n) {
              c.pause();
            }
          o.classList.toggle("playing"),
            c.paused
              ? (c.play(),
                (s[d].style.display = "none"),
                (i[d].style.display = "inline-block"))
              : (c.pause(),
                (s[d].style.display = "inline-block"),
                (i[d].style.display = "none")),
            c.addEventListener("ended", () => {
              o.classList.remove("playing"),
                (s[d].style.display = "inline-block"),
                (i[d].style.display = "none");
            });
        }
      });
    }),
      o.forEach((n) => {
        n.addEventListener("click", () => {
          n.classList.toggle("active");
        });
      }),
      d.forEach((n, s) => {
        n.addEventListener("click", () => {
          a[s];
          const n = audioElement.src,
            i = document.createElement("a");
          (i.href = n),
            i.setAttribute("target", "_blank"),
            i.setAttribute("rel", "noopener noreferrer"),
            i.setAttribute("download", `${songs[s].title}`),
            document.body.appendChild(i),
            i.click(),
            document.body.removeChild(i);
        });
      });
  };
render__two(), handlePlayMusic();
